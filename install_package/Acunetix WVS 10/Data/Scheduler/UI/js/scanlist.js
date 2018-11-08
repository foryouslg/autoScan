var scansListed = new Array();
var scansPerPage = 10;
var numberOfScans = 0;
var numberOfPages = 0;
var pageNumber = 1;
var scansOnLastPage = 0;
var scanItemTemplateNode = null;
var editMode = false;
var editModeScanId = -1;
var lastScanListHash = "";
var FILTER_SCANS_TEXT = 'Search scans ...';

// read page number from location (if available)
//page = parseInt(location.hash.replace("#p", ""));
//if (page > 1) pageNumber = page;

var addValidationHeaderForListScans = function(xhr) {
    xhr.setRequestHeader("RequestValidated", "true");
    if (lastScanListHash != "")
        xhr.setRequestHeader("ReqHash", lastScanListHash);
};

function getScanListError(jqXHR, textStatus, errorThrown) {
	$('.acuNotification').show();	
	setTimeout("getScanList(13)", 5000);
}

function preparePagination(){
    // first page
    if (pageNumber > 1){
        $("#btnFirstPage1").button("enable");
    }
    else{
        $("#btnFirstPage1").button("disable");
    }

    // prev page
    if (pageNumber > 1){
        $("#btnPrevPage1").button("enable");
    }
    else{
        $("#btnPrevPage1").button("disable");
    }

    // next page
    if (pageNumber < numberOfPages){
        $("#btnNextPage1").button("enable");
    }
    else{
        $("#btnNextPage1").button("disable");
    }

    // last page
    if (pageNumber < numberOfPages){
        $("#btnLastPage1").button("enable");
    }
    else{
        $("#btnLastPage1").button("disable");
    }


    // first page
    if (pageNumber > 1){
        $("#btnFirstPage2").button("enable");
    }
    else{
        $("#btnFirstPage2").button("disable");
    }

    // prev page
    if (pageNumber > 1){
        $("#btnPrevPage2").button("enable");
    }
    else{
        $("#btnPrevPage2").button("disable");
    }

    // next page
    if (pageNumber < numberOfPages){
        $("#btnNextPage2").button("enable");
    }
    else{
        $("#btnNextPage2").button("disable");
    }

    // last page
    if (pageNumber < numberOfPages){
        $("#btnLastPage2").button("enable");
    }
    else{
        $("#btnLastPage2").button("disable");
    }

    if (numberOfPages<2)
    {
        $(".paginationScans").hide();
    }
    else{
        $(".paginationScans").show();
    }

    if (!$("#pageNumberInput1").is(":focus"))
        $("#pageNumberInput1").val(pageNumber);

    if (!$("#pageNumberInput2").is(":focus"))
        $("#pageNumberInput2").val(pageNumber);

    $("#numberOfPages1").text(numberOfPages);
    $("#numberOfPages2").text(numberOfPages);

    $("#numberOfScans1").text('(' + numberOfScans + ' scans)');
    $("#numberOfScans2").text('(' + numberOfScans + ' scans)');

    if (numberOfPages && pageNumber > numberOfPages) {
        lastScanListHash = "";
        pageNumber = numberOfPages;
        getScanList(1);
    }
}

function getScanListData(responseData, textStatus, xhr) {
    $('.acuNotification').hide();

	if (responseData) {
		if( responseData.result=="OK" ) {
            refreshScanList(responseData.data.scans);

            numberOfScans = responseData.data.count;
            numberOfPages = Math.floor(numberOfScans/scansPerPage);
            scansOnLastPage = numberOfScans % scansPerPage;
            if (scansOnLastPage > 0) numberOfPages = numberOfPages + 1;

            preparePagination();

            lastScanListHash = xhr.getResponseHeader('ReqHash');
		}
        else
        if( responseData.result=="NC" ) {
            // don't process this data if nothing has changed
        }
		else {
	        if( responseData.errorMessage=="Authentication required!" || responseData.errorMessage=="Invalid username or password!") 
	        {
	                showLogin();
	        }
	        else alert("error:" + responseData.errorMessage);
		}
	} else 
	{
		alert("responseData is null");
	}
	
	setTimeout("getScanList(0)", 1000);
}

function getScanList(source) {
    //console.log("getScanList " + source);
    var urlStr = "/api/listScans";
    if (pageNumber > 1)
        urlStr = urlStr + "?p=" + (pageNumber-1);

    // prepare the filter for list scans
    var filterText = $("#edFilter").val();
    if (filterText != FILTER_SCANS_TEXT && filterText != "")
    {
        if (urlStr.indexOf("?") == -1) urlStr = urlStr + "?f=" + filterText;
        else  urlStr = urlStr + "&f=" + filterText;
    }

    $.ajax({
    	url: urlStr,
        beforeSend: addValidationHeaderForListScans,
    	type: "GET",
    	dataType: "json",
    	success: getScanListData,
    	error:  getScanListError
    });
}

function refreshScanList(scanList){
    // no scans => no select scans divs
    if (scanList.length == 0){
        if ($("#selectScans").is(":visible")) {
            // don't hide if we enter an invalid filter that doesn't return any scans
            if ($("#edFilter").val() == FILTER_SCANS_TEXT || $("#edFilter").val() == "")
                $("#selectScans").hide();
        }
    } else {
        if (!$("#selectScans").is(":visible")){
            $("#selectScans").show();
        }
    }

    $(scansListed).each(function(){
        $(this).scanitem("deleteItem");
    });

	for(var i in scanList) {
		if(scansListed) {
			var found = false;

            $(scansListed).each(function(){
                var item = $(this);
                if(item.scanitem("sameIdAs", scanList[i].id)) {
                  item.scanitem("updateData", scanList[i]);
                  item.scanitem("undeleteItem");
                  found = true;
                  return false;
                }

                return true;
            });
			
			if ( found ) continue;
		}
			
		var newOne = scanItemTemplateNode.clone().scanitem({data : scanList[i]});
		$("#scanList").append(newOne);
		scansListed.push(newOne);
	}
	
	var i = 0;
	while(i < scansListed.length) {
		if ( $(scansListed[i]).scanitem("isDeleted") ) {
			$(scansListed[i]).remove();
			delete scansListed[i];
			scansListed.splice(i, 1);
			continue;
		}		
		i++;
	}
}

function initializeScanList() {
	scanItemTemplateNode = $("#scanItemTemplate");

	$("#btnAddNewScan")
        .button({icons: {primary: "ui-icon-document"}})
        .click(function (){
            editMode = false;
            $('#addEditScanDialog').dialog('open');
        });

	getScanList(2);
}

function initializeScanListPagination() {
    $( "#btnFirstPage1" ).button({
        icons: {
            primary: "ui-icon-arrowthickstop-1-w"
        },
        text: false
    }).click(function() {
            lastScanListHash = "";
            pageNumber = 1;
            getScanList(3);
    });
    $( "#btnPrevPage1" ).button({
        icons: {
            primary: "ui-icon-arrowthick-1-w"
        },
        text: false
    }).click(function() {
            lastScanListHash = "";

            if (pageNumber > 1) pageNumber = pageNumber - 1;
            else pageNumber = 1;

            getScanList(4);
        });

    $( "#btnNextPage1" ).button({
        icons: {
            primary: "ui-icon-arrowthick-1-e"
        },
        text: false
    }).click(function() {
            lastScanListHash = "";

            if (pageNumber < numberOfPages) pageNumber = pageNumber + 1;
            else pageNumber = numberOfPages;

            getScanList(5);
    });
    $( "#btnLastPage1" ).button({
        icons: {
            primary: "ui-icon-arrowthickstop-1-e"
        },
        text: false
    }).click(function() {
            lastScanListHash = "";
            pageNumber = numberOfPages;
            getScanList(6);
        });


    $( "#btnFirstPage2" ).button({
        icons: {
            primary: "ui-icon-arrowthickstop-1-w"
        },
        text: false
    }).click(function() {
            pageNumber = 1;
            getScanList(7);
        });
    $( "#btnPrevPage2" ).button({
        icons: {
            primary: "ui-icon-arrowthick-1-w"
        },
        text: false
    }).click(function() {
            lastScanListHash = "";
            if (pageNumber > 1) pageNumber = pageNumber - 1;
            else pageNumber = 1;
            getScanList(8);
        });

    $( "#btnNextPage2" ).button({
        icons: {
            primary: "ui-icon-arrowthick-1-e"
        },
        text: false
    }).click(function() {
            lastScanListHash = "";
            if (pageNumber < numberOfPages) pageNumber = pageNumber + 1;
            else pageNumber =numberOfPages;
            getScanList(9);
        });
    $( "#btnLastPage2" ).button({
        icons: {
            primary: "ui-icon-arrowthickstop-1-e"
        },
        text: false
    }).click(function() {
            lastScanListHash = "";
            pageNumber = numberOfPages;
            getScanList(10);
        });

    $('#pageNumberInput1').bind('keypress', function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if(code == 13) {
            var newPage = parseInt($('#pageNumberInput1').val());
            if (newPage <= numberOfPages && newPage >= 1) {
                lastScanListHash = "";
                pageNumber = newPage;
                getScanList(11);
            } else  alert('Invalid page number!');
        }
    });

    $('#pageNumberInput2').bind('keypress', function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if(code == 13) {
            var newPage = parseInt($('#pageNumberInput2').val());
            if (newPage <= numberOfPages && newPage >= 1) {
                lastScanListHash = "";
                pageNumber = newPage;
                getScanList(12);
            } else  alert('Invalid page number!');
        }
    });
}

function initializeScanListFilters() {
    $('#scansMenu').listdropdown({
        list : this.unconfirmedScans,
        items : [
            {caption: 'Select all', effect: function(){
                for(var j in scansListed)
                    $(scansListed[j]).scanitem("check", "");
            }},
            {caption: 'Select none', effect: function(){
                for(var j in scansListed)
                    $(scansListed[j]).scanitem("uncheck", "");
            }},
            {caption: '-'},
            {caption: 'Select running', effect: function(){
                for(var j in scansListed)
                    $(scansListed[j]).scanitem("check", "running");
            }},
            {caption: 'Select terminated', effect: function(){
                for(var j in scansListed)
                    $(scansListed[j]).scanitem("check", "terminated");
            }},
            {caption: '-'},
            {caption: 'Select crashed', effect: function(){
                for(var j in scansListed)
                    $(scansListed[j]).scanitem("check", "crashed");
            }}
        ]
    });

    $( "#btnCollapse" ).button({
        icons: {
            primary: "ui-icon-triangle-1-s"
        }
    }).click(function() {
        for(var j in scansListed)
            if ($(scansListed[j]).scanitem("isChecked"))
                $(scansListed[j]).scanitem("collapse");
    });

    $( "#btnExpand" ).button({
        icons: {
            primary: "ui-icon-triangle-1-n"
        }
    }).click(function() {
            for(var j in scansListed)
                if ($(scansListed[j]).scanitem("isChecked"))
                    $(scansListed[j]).scanitem("expand");
    });

    // filter scans edit
    $("#edFilter").addClass("edFilterDefault");
    $("#edFilter").val(FILTER_SCANS_TEXT);


    $("#edFilter").bind("focus", function (e) {
        if ($("#edFilter").val() == FILTER_SCANS_TEXT) {
            $("#edFilter").removeClass("edFilterDefault");
            $("#edFilter").val("");
        }
    });

    $("#edFilter").bind("blur", function (e) {
        if ($("#edFilter").val() == "") {
            $("#edFilter").addClass("edFilterDefault");
            $("#edFilter").val(FILTER_SCANS_TEXT);
        }
    });

    $( "#btnStop" ).button({
        icons: {
            primary: "ui-icon-stop"
        }
    }).click(function() {
            if (scansListed.length) {
                for(var j in scansListed)
                    if ($(scansListed[j]).scanitem("isChecked"))
                        $(scansListed[j]).scanitem("stopScan");
            }
        });

    $( "#btnDelete" ).button({
        icons: {
            primary: "ui-icon-closethick"
        }
    }).click(function() {
        var ids = new Array();

        if (scansListed.length) {
            for(var j in scansListed)
                if ($(scansListed[j]).scanitem("isChecked"))
                    ids.push($(scansListed[j]).scanitem("getScanId"));

            if (ids.length) {
                $( "#dialog:ui-dialog" ).dialog( "destroy" );
                $( "#deleteSchedulesDialog" ).dialog({
                    resizable: false,
                    height:160,
                    width: 320,
                    modal: true,
                    buttons: {
                        "Delete": function() {
                            var deleteScanResults = 0;
                            if ($( "#dsdsDeleteResults").is(':checked')) deleteScanResults = 1;

                            $.ajax({
                                url: "/api/deleteScans",
                                beforeSend: addValidationHeader,
                                type: "POST",
                                dataType: "json",
                                contentType: "application/json",
                                data: JSON.stringify({"id" : ids, "deleteScanResults":deleteScanResults }),
                                success: function (data) {lastScanListHash = ""; if(data.result != "OK") alert("Error: " + data.errorMessage);},
                                error:  function (jqXHR, textStatus, errorThrown) {alert("Error: " + textStatus);}
                            });

                            $( this ).dialog( "close" );
                        },
                        "Delete All": function() {
                            var deleteScanResults = 0;
                            if ($( "#dsdsDeleteResults").is(':checked')) deleteScanResults = 1;

                            // reset page number
                            pageNumber = 1;

                            $.ajax({
                                url: "/api/deleteAllScans",
                                beforeSend: addValidationHeader,
                                type: "POST",
                                dataType: "json",
                                contentType: "application/json",
                                data: JSON.stringify({"id" : ids, "deleteScanResults":deleteScanResults }),
                                success: function (data) {lastScanListHash = ""; if(data.result != "OK") alert("Error: " + data.errorMessage);},
                                error:  function (jqXHR, textStatus, errorThrown) {alert("Error: " + textStatus);}
                            });

                            $( this ).dialog( "close" );
                        },
                        Cancel: function() {
                            $( this ).dialog( "close" );
                        }
                    }
                });
            }
        }
    });
}

//DROPDOWN CLASS
//-----------------------------------------------------------------
$.widget('ui.listdropdown', {
    options : {},
    menu : null,
    button : null,
    workingOn : null,

    _init : function () {
        var self =this;

        var widgetButton = $(document.createElement('SPAN'));
        widgetButton.button({
            icons: {
                primary: "ui-icon-check"
            },
            label: "Select ..."
        });

        $(this.element).append(widgetButton);

        $(this.element)
            .bind('click', function (e){
                self.showMenu();
                e.preventDefault();
            });
        $(this.element)
            .bind('mouseleave', function (e){
                self.hideMenu();
                e.preventDefault();
            });

        this.menu = $(document.createElement('SPAN'))
            .addClass('dropdownMenu')
            .appendTo(widgetButton)
            .hide();

        for(var i=0; i<this.options.items.length; i++) {
            if(this.options.items[i].caption != '-') {
                $(document.createElement('A'))
                    .text(this.options.items[i].caption)
                    .attr('href', '#')
                    .attr('index', i)
                    .bind('click', function (e) {self.clicked(e)})
                    .appendTo(this.menu);
            } else {
                $(document.createElement('HR'))
                    .appendTo(this.menu);
            }
        }
    },

    clicked : function (e) {
        e.stopPropagation();
        this.menu.hide();
        var idx = $(e.target).attr('index');
        if(this.options.items[idx]) {
            if(this.options.items[idx].effect) {
                this.options.items[idx].effect();
            }
        }
        e.preventDefault();
    },

    showMenu : function () {
        this.menu.show();
    },

    hideMenu : function () {
        this.menu.hide();
    }
});
