// JavaScript Document
var addValidationHeader = function(xhr) {
    xhr.setRequestHeader("RequestValidated", "true");     
};

function getCurrentDateAndTime(){
	var curDate = new Date();
	var dateStr = (curDate.getMonth()+1) + "/" + curDate.getDate() + "/" + curDate.getFullYear();
	
	var v = new Date();
	v.setMinutes(curDate.getMinutes()+5);	
	
	var hour = v.getHours(); 
	var min = v.getMinutes();
	
	// pad if necessary
	if (hour < 10) hour = '0'+hour; 
	if (min < 10) min = '0'+min;
	
	var timeStr = hour + ":" + min;

	return {"date": dateStr, "time": timeStr};
}

function addMonthDaysToSelect ( jqSelectElement ) {
	for(var i=0;i<31;i++){
		jqSelectElement.append(
			$(document.createElement("OPTION"))
				.val(i+1)
				.text(i+1)
		);
	}
}

function scanTypeChange() {
	$(".inputErrorMsg").hide();
	var scanTypeVal = $("#scanType").val();
	switch(scanTypeVal){
		case "scan" :
		case "scanWSDL" :
			$("#trTargetContainer").show();
			$("#trTargetListContainer").hide();
			$("#param_loginSeq").attr("disabled", false);
		break;
		case "scanList" :
			$("#trTargetContainer").hide();
			$("#trTargetListContainer").show();
			$("#param_loginSeq").attr("disabled", true);
		break;
	}
}

function recurseChange() {
	var recurseType = $("#recurse").val();
	switch(recurseType){
		case "-1" :	// once
			$("#trDateContainer").show();
			$("#trWeekDayContainer").hide();
			$("#trMonthDayContainer").hide();
            $("#trTimeContainer").show();
		break;
		case "0" :	// every day
			$("#trDateContainer").hide();
			$("#trWeekDayContainer").hide();
			$("#trMonthDayContainer").hide();
            $("#trTimeContainer").show();
		break;
		case "9" :	// every week
			$("#trDateContainer").hide();
			$("#trWeekDayContainer").show();
			$("#trMonthDayContainer").hide();
            $("#trTimeContainer").show();
		break;
		case "10" :	// every month
			$("#trDateContainer").hide();
			$("#trWeekDayContainer").hide();
			$("#trMonthDayContainer").show();
            $("#trTimeContainer").show();
		break;
        case "11" :	// continuous1
            $("#trDateContainer").show();
            $("#trWeekDayContainer").hide();
            $("#trMonthDayContainer").hide();
            $("#trTimeContainer").show();
        break;
        case "12" :	// continuous2
            $("#trDateContainer").show();
            $("#trWeekDayContainer").hide();
            $("#trMonthDayContainer").hide();
            $("#trTimeContainer").show();
            break;
    }
}

function toggleMoreOptions() {
	
	var btn = $("#btnToggleMoreOptions");
	var currentState = btn.attr("down");
	if(currentState == undefined)currentState="visible";
	if(currentState == "visible"){
		$("#tbodyMoreScanOptions").hide();
		btn.attr("down", "").html("More options &raquo;");
	}
	else {
		$("#tbodyMoreScanOptions").show();
		btn.attr("down", "visible").html("Less options &laquo;");
	}
	
	return false;
}

function getScanningProfiles(data) {
	if(data == undefined) {
		$.ajax({
			url: "/api/listProfiles",
            beforeSend: addValidationHeader,
			dataType: "json",
			success: getScanningProfiles
		});
	}
	else {
		if(data.result == "OK") {
			var selectEl = $("#param_profile");
			selectEl.empty();
			for(var i in data.data) {
				selectEl.append(
					$(document.createElement("OPTION"))
						.val(data.data[i])
						.text(data.data[i])
				);
			}
		}
	}
}

function getReports(data) {
	if(data == undefined) {
		$.ajax({
			url: "/api/listReports",
            beforeSend: addValidationHeader,
			dataType: "json",
			success: getReports
		});
	}
	else {
		if(data.result == "OK") {
			var selectEl = $("#param_reporttemplate");
			selectEl.empty();
			for(var i in data.data) {
				var element = $(document.createElement("OPTION"))
					.val(data.data[i].filename)
					.text(data.data[i].name);
				
				if (data.data[i].isdefault == true) 
					element.attr("selected", "selected");
				
				selectEl.append(
					element
				);
			}
		}
	}
}

function getExcludedHours(data) {
	if(data == undefined) {
		$.ajax({
			url: "/api/listTemplates",
            beforeSend: addValidationHeader,
			dataType: "json",
			success: getExcludedHours
		});
	}
	else {
		if(data.result == "OK") {
			var selectEl = $("#param_excludedhours");
			selectEl.empty();
			for(var i in data.data) {
				selectEl.append(
					$(document.createElement("OPTION"))
						.val(data.data[i])
						.text(data.data[i])
				);
			}
		}
	}
}

function getLoginSequences(data) {
	if(data == undefined) {
		$.ajax({
			url: "/api/listLoginSeq",
            beforeSend: addValidationHeader,
			dataType: "json",
			success: getLoginSequences
		});
	}
	else {
		if(data.result == "OK") {
			// by default append a <none> option (for scans without login sequence)
			var selectEl = $("#param_loginSeq");
			selectEl.empty();
			selectEl.append(
					$(document.createElement("OPTION"))
						.val('<none>')
						.text('<none>')
					);
			
			for(var i in data.data) {
				selectEl.append(
					$(document.createElement("OPTION"))
						.val(data.data[i])
						.text(data.data[i])
				);
			}
		}
	}
}

function getSettings(data) {
	if(data == undefined) {
		$.ajax({
			url: "/api/listSettings",
            beforeSend: addValidationHeader,
			dataType: "json",
			success: getSettings
		});
	}
	else {
		if(data.result == "OK") {
			var selectEl = $("#param_settings");
			selectEl.empty();
			for(var i in data.data) {
				selectEl.append(
					$(document.createElement("OPTION"))
						.val(data.data[i])
						.text(data.data[i])
				);
			}
		}
	}
}

function getInputValue(input){
	// for checkbox return True/False
	if ($(input).is(':checkbox'))
	{	
		if ($(input).is(':checked')) return "True";
			else return "False";
	} 
	else
	{
		return $(input).val();
	}
}

function inputIsValid(){
	var valid = true;	
	$(".inputErrorMsg").hide();
	
	// validate target
	var scanTypeVal = $("#scanType").val();
	var scanTarget = $("#target").val(); 
	var scanTargetList = $("#targetList").val();
	
	if (scanTypeVal == "scanList") {
        if (scanTargetList == "") {
    		$("#targetListError").text("Invalid input! (e.g. http://localhost/)").show();
    		valid = false;
        }
	}
	else
		if (scanTarget == "") {
			$("#targetError").text("Invalid URL! (e.g. http://localhost/)").show();
			valid = false;
		}
	
	// validate date
	var dateVal = $("#date").val();
    if (dateVal) {
        var re = new RegExp('^\s*\\d+/\\d+/\\d{2,}\s*$');
        if (!dateVal.match(re)) {
            $("#dateError").text("Invalid date! (e.g. 06/12/2011)").show();
            valid = false;
        }
    }

	// validate time
	var timeVal = $("#time").val();
    if (timeVal) {
        var re = new RegExp('^\s*(\\d+):(\\d+)\s*$');
        match = re.exec(timeVal);
        if (!match || (match[1]>24 || match[1]<0 || match[2]>60 || match[2]<0) ) {
            $("#timeError").text("Invalid time! (e.g. 12:05)").show();
            valid = false;
        }
    }
	// check if the time is in the past
	var recurseType = $("#recurse").val();
	// recurse once ?
	if (recurseType == "-1") {
		date_parts = dateVal.split('/');
		if (date_parts) {
			date_month = date_parts[0] - 1;
			date_day = date_parts[1];	
			date_year = date_parts[2];	
		}
	
		time_parts = timeVal.split(':');
		if (time_parts) {
			time_hour = time_parts[0];
			time_min = time_parts[1];	
		}
		
		var future = new Date(date_year, date_month, date_day, time_hour, time_min, 0, 0); 
		var now = new Date();
		
		if (future < now) {		
			$("#timeError").text("Date/time is in the past!").show();
			valid = false;
		}
	}
	
	return valid;
}

function submitForm () {
	if (!inputIsValid()) {
        $("#accordionOptions").accordion( "option", "active", 0 );
        return false;
    }
	  
	var inputs = $("#addEditScanForm :input");
	var json = new Object();
	
	var params = new Object();
	
	for(var i=0; i<inputs.length; i++) {
		if (inputs[i].id.indexOf("param_") !== 0) json[inputs[i].id] = getInputValue(inputs[i]);
		else {
			var input_id = inputs[i].id;
			input_id = input_id.replace("param_", "");
			params[input_id] = getInputValue(inputs[i]);
		}
	}
	
	json["params"] = params;
	
	var scanTypeVal = $("#scanType").val();
	var scanTargetList = $("#targetList").val();
	var targetsClean = new Array();
	
	json['scanType'] = scanTypeVal;
	
	if (scanTypeVal == "scanList") {
		
		var targets = scanTargetList.split("\n");
		
		for (var i=0; i<targets.length; i++){
				var target = jQuery.trim(targets[i]);
				if (target == "") continue;
				targetsClean.push(target);
		}
		
		json['scanType'] = 'scan';
	}
	
	else {
	
		var target = $("#target").val();
		if (target == "") return false;
		targetsClean.push(target);		
	}
	
	if (targetsClean.length > 250) 
    {
        alert("It's not possible to add more than 250 targets!");
        return;
    }

    // reset page number to the first page
    pageNumber = 1;

    json['target'] = targetsClean;

    var urlStr = "/api/addScan";

    // add or edit scan?
    if (editMode == true) {
        urlStr = "/api/editScan";
        json['scanid'] = editModeScanId;
    }

	$.ajax({
		url: urlStr,
        beforeSend: addValidationHeader,
		type: "POST",
		dataType: "json",
		contentType: 'application/json', 
		data: JSON.stringify(json),
		success: function (data) {
			if(data.result == "OK") {$("#addEditScanDialog").dialog("close");} 
			else alert("Error: " + data.errorMessage);
			},
		error:  function (jqXHR, textStatus, errorThrown) {
			alert(textStatus);
		}
	});				
}

function openDialog(){
    if (editMode == false) {
        var dateTime = getCurrentDateAndTime();
        $("#date").val(dateTime.date);
        $("#time").val(dateTime.time);
    }

	$(".inputErrorMsg").hide();
}

function populateAddScanDialogData(){
	getScanningProfiles(undefined);
	getLoginSequences(undefined);
	getSettings(undefined);
	getExcludedHours(undefined);
	getReports(undefined);
}

function unmarkScanItem() {
    for(var j in scansListed){
        if( $(scansListed[j]).scanitem("sameIdAs", editModeScanId) ) {
            $(scansListed[j]).scanitem("unmark");
        }
    }
}

function initializeAddScanDlg (){
	$(".inputErrorMsg").hide();

	addMonthDaysToSelect($("#dayOfMonth"));
	$("#scanType").change(scanTypeChange);
	scanTypeChange();
	$("#recurse").change(recurseChange);
	recurseChange();
	$("#btnToggleMoreOptions").click(toggleMoreOptions);
	toggleMoreOptions();
	$("#btnOk").click(submitForm);

	$( "#date" ).datepicker();

	$( "#accordionOptions" ).accordion({
		autoHeight: true
	});
	$("#addEditScanDialog").dialog({
		autoOpen: false,
		width: 705,
		height: 460,
		title: "Add/Edit scan",
		modal: true,
		open: function(event, ui) {
			openDialog();
		},
		buttons: {
			"OK": function() {
                unmarkScanItem();
				submitForm();
			}, 
			"Cancel": function() {
                unmarkScanItem();
				$("#addEditScanDialog").dialog("close");
			} 
		}
	});
	
	populateAddScanDialogData();
}
