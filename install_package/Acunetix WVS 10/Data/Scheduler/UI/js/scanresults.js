/**
 * Scan results dialog
 */

function initializeScanResultsDlg (){
    $("#scanResultsDialog").dialog({
        autoOpen: false,
        width: 650,
        height: 450,
        title: "Scan results",
        modal: false,
        open: function(event, ui) {
            openSRDialog();
        },
        buttons: {
            "OK": function() {
                $("#scanResultsDialog").dialog("close");
            },
            "Cancel": function() {
                $("#scanResultsDialog").dialog("close");
            }
        }
    });
}

function openSRDialog(){
    var tbody = $("#scanResultsTableBody");

    // loading
    tbody.html("<tr><td colspan='4'><center><img src='img/ajax-loader.gif' border='0'></center></td></tr>");

    var srdialog = $('#scanResultsDialog');
    var scanId = srdialog.data('link').options.data.id;

    $.ajax({
        url: "/api/getScanResults",
        beforeSend: addValidationHeader,
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({"id" : scanId }),
        success: function (data) {if(data.result == "OK") {
            populateSRDialog(data, scanId);
        } else alert("Error: " + data.errorMessage);},
        error:  function (jqXHR, textStatus, errorThrown) {alert("Error: " + textStatus);}
    });

    return false;
}

function populateSRDialog(data, scanId){
	var tbody = $("#scanResultsTableBody");
	if (tbody == null) return;
	if (data.data == null) return;

	tbody.empty();
	for (var i = 0; i < data.data.length; i++) {
        var trow = $("<tr>");
        
        if (i % 2 == 1) trow.addClass("scanResultsTableTr1");
        else trow.addClass("scanResultsTableTr2");

        // icon
        var imgHTML = "<img border='0' src='/img/sr.png'>";

        $("<td>")
            .html(imgHTML)
            .appendTo(trow);

        // date
        $("<td>")
        	.addClass("scanResultsTableDate")
            .text(data.data[i].date)
            .appendTo(trow);

        // size
        $("<td>")
        	.addClass("scanResultsTableMessage")
            .text(data.data[i].size)
            .appendTo(trow);

        // actions
        var hash = data.data[i].id;

        var btnsHTML = "<a id='btnDownSR" + hash +"' href='#'>Download</a>";
        btnsHTML += " <span id='btnDelSR" + hash +"'>Delete</span>";

        $("<td>")
            .html(btnsHTML)
            .appendTo(trow);

        trow.appendTo(tbody);

        var btnDownload = $( "#btnDownSR" + hash ).button({
            icons: {
                primary: "ui-icon-disk"
            }
        });

        btnDownload.attr("href", "/api/download/" + scanId + ":" + hash);

        $( "#btnDelSR" + hash ).button({
            icons: {
                primary: "ui-icon-trash"
            }
        }).click(function(e) {
                if (confirm("Delete scan results?"))
                {
                    var hash = $(e.currentTarget).attr('id').replace("btnDelSR", "");
                    $.ajax({
                        url: "/api/deleteScanResults",
                        beforeSend: addValidationHeader,
                        type: "POST",
                        dataType: "json",
                        contentType: "application/json",
                        data: JSON.stringify({"id" : (scanId + ":" + hash)}),
                        success: function (data) {if(data.result == "OK") {
                            lastScanListHash = "";
                            openSRDialog();
                        } else alert("Error: " + data.errorMessage);},
                        error:  function (jqXHR, textStatus, errorThrown) {alert("Error: " + textStatus);}
                    });
                }
        });
    }
}

