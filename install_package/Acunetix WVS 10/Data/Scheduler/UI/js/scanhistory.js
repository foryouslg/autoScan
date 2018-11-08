/**
 * Scan history dialog
 */

function populateSHDialog(data){
	var tbody = $("#scanHistoryTableBody");
	if (tbody == null) return;
	if (data.data == null) return;

	tbody.empty();
	
    for (var i = 0; i < data.data.length; i++) {
        var trow = $("<tr>");
        
        if (i % 2 == 1) trow.addClass("scanHistoryTableTr1");
        else trow.addClass("scanHistoryTableTr2");        
   
        // date	
        $("<td>")
        	.addClass("scanHistoryTableDate")
            .text(data.data[i].date)
            .appendTo(trow);

        // icon
        var evId = data.data[i].type; 
        if (evId == 1 || evId == 7) imgHTML = "<img border='0' src='/img/error.png'>";
        else imgHTML = "<img border='0' src='/img/info.png'>";
        
        $("<td>")   
	        .html(imgHTML)
	        .appendTo(trow);

        // message	
        $("<td>")
        	.addClass("scanHistoryTableMessage")
            .text(data.data[i].msg)
            .appendTo(trow);
        
        trow.appendTo(tbody);
    }
}

function clearScanHistory(){
	var shdialog = $('#scanHistoryDialog'); 
	var scanId = shdialog.data('link').options.data.id; 
	
	$.ajax({
		url: "/api/clearScanHistory",
        beforeSend: addValidationHeader,
		type: "POST",
		dataType: "json",
		contentType: "application/json", 
		data: JSON.stringify({"id" : scanId }),
		success: function (data) {if(data.result == "OK") {
			var tbody = $("#scanHistoryTableBody");
			if (tbody == null) return;
			tbody.empty();			
		} else alert("Error: " + data.errorMessage);},
		error:  function (jqXHR, textStatus, errorThrown) {alert("Error: " + textStatus);} 
	});
	
	return false;
}

function openSHDialog(){
	var shdialog = $('#scanHistoryDialog'); 
	var scanId = shdialog.data('link').options.data.id; 
	
	$.ajax({
		url: "/api/getScanHistory",
        beforeSend: addValidationHeader,
		type: "POST",
		dataType: "json",
		contentType: "application/json", 
		data: JSON.stringify({"id" : scanId }),
		success: function (data) {if(data.result == "OK") {
			populateSHDialog(data);
		} else alert("Error: " + data.errorMessage);},
		error:  function (jqXHR, textStatus, errorThrown) {alert("Error: " + textStatus);} 
	});
	
	return false;
}

function initializeScanHistoryDlg (){
	$("#scanHistoryDialog").dialog({
		autoOpen: false,
		width: 700,
		height: 400,
		title: "Scan history",
		modal: false,
		open: function(event, ui) {
			openSHDialog();
		},
		buttons: {
			"OK": function() { 
				$("#scanHistoryDialog").dialog("close");
			}, 
			"Cancel": function() { 
				$("#scanHistoryDialog").dialog("close");
			},
			"Clear": function() { 
				clearScanHistory();
			} 
		}
	});
}
