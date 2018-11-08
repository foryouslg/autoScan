function initializeCSVImportDlg (){
    $("#csvImportDialog").dialog({
        autoOpen: false,
        width: 450,
        height: 180,
        title: "Import scans from CSV file",
        modal: true,
        buttons: {
            "OK": function() {
                if ($('#deleteScans').is(':checked')) $('#csvImportForm').attr("action", "/importCSV?delete=true");
                else $('#csvImportForm').attr("action", "/importCSV");

                // reset page number to the first page
                pageNumber = 1;

                $('#csvImportForm').submit();
            },
            "Cancel": function() {
                $("#csvImportDialog").dialog("close");
            }
        }
    });

    $("#btnImportScansFromCSV")
        .button({icons: {primary: "ui-icon-extlink"}})
        .click(function (){
        $('#csvImportDialog')
            .dialog('open');
        });
}
