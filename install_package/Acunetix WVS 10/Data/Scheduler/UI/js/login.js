function loginDialogIsOpen()
{
    return $("#loginDialog").data("dialog").isOpen();
}

function initLogin() {

	$("#loginDialog").dialog({
		autoOpen: false,
		width: 320,
		height: 175,
		title: "Enter credentials",
		modal: true,
		buttons: {
			"Login": function() { doLogin(); }
		}
	});
	
	$('#loginUser,#loginPass').bind('keypress', function(e) {
		var code = (e.keyCode ? e.keyCode : e.which);
		if(code == 13) doLogin();
	}
	);
}

function validateLogin( data ) {
	if ( data.result == "OK" ) {		
		$("#loginDialog").dialog("close");
		populateAddScanDialogData();
	}
	else {
		$("#loginErrorMessage").text("Error: " + data.errorMessage);
	}
}

function doLogin() {
	var userName = $("#loginUser").val();
	var password = $("#loginPass").val();
	var token = hex_md5(hex_md5(hex_md5(userName) + hex_md5(password)) + password);
	
	$.ajax({
		url: "/api/auth",
        beforeSend: addValidationHeader,
		type: "POST",
		dataType: "json",
		contentType: "application/json", 
		data: JSON.stringify({"token" : token }),
		success: function (data) {validateLogin(data);},
		error:  function (jqXHR, textStatus, errorThrown) {$("#loginErrorMessage").text("Error: " + textStatus);} 
	});
}

function showLogin() {
    if (!loginDialogIsOpen()) 
    {
    	$("#loginErrorMessage").text("");
    	$("#loginDialog").dialog("open");
    }
}
