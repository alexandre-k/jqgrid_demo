'use strict';
require('free-jqgrid');

import io from 'socket.io-client';
import axios from 'axios';

console.log(io)
// const socket = io('http://localhost:5000', {transports: ['websocket']});

// socket.on('connect', function() {socket.send('A user has connected!')});
// socket.on('message', function(data) { console.log(data)});


let container = document.querySelector('#root');
container.innerHTML = `<h1>Hello</h1>`;

async function getData () {
  let resp = await axios('http://localhost:5000/data');
  return resp.data;

};

// const editUnlockedCell = (cellValue, options, rowData, action) => {
//   if ()
// }


$("#spreadsheet").jqGrid({
  url: 'http://localhost:5000/data',
  datatype: 'json',
  colModel: [
    { name: "Id", hidden: true },
    { name: "Name", editable: true },
    { name: "PClass", editable: true, filtering: true },
    { name: "Age", editable: true },
    { name: "Sex" },
    { name: "Survived" },
    { name: "SexCode" }],
  data: [],
  cellEdit: true,
  loadonce: true,
  onSelectCell: (rowId, cellName, value, iRow, iCol) => {
    console.log('BEFORE EDITING', 'cell name', cellName, 'value', value, iRow, iCol)
    console.log('IROW', iRow)
    
  },
  onCellSelect: (rowId, iCol, cellContent, e) => {
    console.log('On select', rowId, 'iCol', iCol, 'cellContent', cellContent)
    console.log(e)
    
  },
  beforeEditCell: (rowId, cellName, value, iRow, iCol) => {
    console.log('before Edit cell', rowId, cellName, value, iRow, iCol);
    if (iRow === 7) {
      console.log('COndition filled')
      $('#spreadsheet').jqGrid('setCell', rowId, cellName, '', 'not-editable-cell')
    }
    
  },
  filtering: true,
  pageSize:15,
  loadData: function() {
    var d = $.Deferred();
    console.log(getData())

    $.ajax({
      url: 'http://localhost:5000/data',
      dataType: "json"
    }).done(function(response) {
      console.log(response)
	d.resolve(response.value);
    });

    return d.promise();
  },
  loadComplete: () => {
    console.log('DONE')
  },
  gridview: true
})


$('#spreadsheet').jqGrid('filterToolbar', { stringResult: true, searchOnEnter: true, defaultSearch: 'cn'});

// $('#spreadsheet').jqGrid('setGridParam', {datatype: 'json', url: 'http://localhost:5000/data'});
// $('#spreadsheet').trigger('reloadGrid', [{current: true}]);
