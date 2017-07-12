/**
 * Created by sereb on 17/4/2017.
 */

$(document).on('click', '#btnExport', function(e){
	e.preventDefault();

	//getting data from our table
	var data_type = 'data:application/vnd.ms-excel';
	var table_div = document.getElementById('smartTable');
	var table_html = table_div.outerHTML.replace(/ /g, '%20');

	var a = document.createElement('a');
	var today = new Date();
	a.href = data_type + ', ' + table_html;
	a.download = 'exported_schdule_' + today.toDateString() + '.xls';
	a.click();

});