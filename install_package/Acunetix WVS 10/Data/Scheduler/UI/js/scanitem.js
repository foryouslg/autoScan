var SCANITEM_EFFECT = null;
if ($.browser.msie)
	SCANITEM_EFFECT = null;

// create widget
$.widget("ui.scanitem", {
	options : {},
	scanItemTitle : null,
	scheduleInfo : null,
	scanStatus : null,
	scanProgress : null,
	btnDownload : null,
	btnPauseResume : null,
	btnStopScan : null,
	btnCollapseSchedule : null,
	btnDeleteSchedule : null,
	btnScanHistory : null,
	btnEdit : null,
	btnConfirmScan : null,
	deleted : false,
	collapsed : false,

	_init : function() {
		var self = this;

		var myElement = $(this.element);
		myElement.addClass("scanItem");

		// scan item selection
		$("[role=siSelection]", this.element).click(function () {
			$(this).toggleClass("siSelection");
		});

		// get all important elements
		this.scanItemTitle = $("[role=scanItemTitle]", this.element);
		this.scheduleInfo = $("[role=scheduleInfo]", this.element);
		this.scanStatus = $("[role=scanStatus]", this.element);
		this.scanProgress = $("[role=scanProgress]", this.element).progressbar({value: 0});
		this.btnDownload = $("[role=btnDownload]", this.element).button({icons:{primary:"ui-icon-disk"}});
		this.btnPauseResume = $("[role=btnPauseResume]", this.element).button({icons:{primary:"ui-icon-pause"}});
		this.btnStopScan = $("[role=btnStopScan]", this.element).button({icons:{primary:"ui-icon-stop"}});
		this.btnScanHistory = $("[role=btnScanHistory]", this.element).button({icons:{primary:"ui-icon-info"}});
		this.btnEdit = $("[role=btnEdit]", this.element).button({icons:{primary:"ui-icon-wrench"}});
		this.btnConfirmScan = $("[role=btnConfirmScan]", this.element).button({icons:{primary:"ui-icon-check"}});

		var btnCollapseSchedule = $("[role=btnCollapseSchedule]", this.element)
			.hover(
			function() {
				btnCollapseSchedule.addClass('ui-button-collapse-schedule-hover');
			},
			function() {
				btnCollapseSchedule.removeClass('ui-button-collapse-schedule-hover');
			}
		);

		this.btnCollapseSchedule = btnCollapseSchedule;

		var btnDeleteSchedule = $("[role=btnDeleteSchedule]", this.element)
			.hover(
			function() {
				btnDeleteSchedule.addClass('ui-button-delete-schedule-hover');
			},
			function() {
				btnDeleteSchedule.removeClass('ui-button-delete-schedule-hover');
			}
		);

		this.btnDeleteSchedule = btnDeleteSchedule;

		// bind clicks to buttons
		// *********************************************************************************************************
		this.btnStopScan.bind("click", function(){return self.stopScan();});
		this.btnCollapseSchedule.bind("click", function(){return self.expandOrCollapse();});
		this.btnDeleteSchedule.bind("click", function(){return self.deleteSchedule();});
		this.btnPauseResume.bind("click", function(){return self.pauseOrResumeScan();});
		this.btnScanHistory.bind("click", function(){return self.openScanHistory();});
		this.btnDownload.bind("click", function(){return self.openScanResults();});
		// edit scan
		this.btnEdit.bind("click", function(){
			editMode = true;
			self.mark();
			self.prepareScanForEdit();
			$('#addEditScanDialog').dialog('open');
		});
		this.btnConfirmScan.bind("click", function(){return self.confirmScan();});

		if (isDemoVersion)
			this.btnDownload.bind("click", function(){alert('In the free version scans are not saved!');});
		
		this.updateUI();
		$(this.element).show();
	},

	updateUI : function () {
		this.scanItemTitle.text(this.targetStr(true));
		this.scheduleInfo.text(this.recurseStr());
		this.scanStatus.text(this.statusStr());

		switch(this.options.data.status){
			case "terminated":
				this.scanProgress.progressbar("value", 0);
				this.scanProgress.hide();

				if (this.options.data.haveResults == 1) {
					this.btnDownload.show();
					if($.browser.msie) this.btnDownload.attr('style', '');
				} else this.btnDownload.hide();

				this.btnStopScan.hide();
				this.btnPauseResume.hide();
				this.btnEdit.show();
				this.btnConfirmScan.hide();

                $("[role=siSelection]", this.element).addClass("siTerminated");
			break;

			case "running":
				this.scanProgress.progressbar("value", this.options.data.progress);
				this.scanProgress.show();

				if (this.options.data.haveResults == 1) {
					this.btnDownload.show();
					if($.browser.msie) this.btnDownload.attr('style', '');
				} else this.btnDownload.hide();

				this.btnStopScan.show();
				if($.browser.msie) this.btnStopScan.attr('style', '');

				this.btnPauseResume.show()
					.button("option", "label", "pause");
				if($.browser.msie) this.btnPauseResume.attr('style', '');

				this.btnEdit.hide();
				this.btnConfirmScan.hide();
			break;

			case "paused":
				this.scanProgress.progressbar("value", this.options.data.progress);
				this.scanProgress.show();
				this.btnDownload.hide();
				this.btnStopScan.show();

				this.btnPauseResume.show().button("option", "label", "resume");
				if($.browser.msie) this.btnPauseResume.attr('style', '');

				this.btnEdit.hide();
				this.btnConfirmScan.hide();
			break;

			case "none":
				this.scanProgress.progressbar("value", 0);
				this.scanProgress.hide();
				if (this.options.data.runCount <= 0) this.btnDownload.hide();
				else {
					if (this.options.data.haveResults == 1) {
						this.btnDownload.show();
						if($.browser.msie) this.btnDownload.attr('style', '');
					}
					else this.btnDownload.hide();
				}
				this.btnStopScan.hide();
				this.btnPauseResume.hide();
				this.btnEdit.show();
				this.btnConfirmScan.hide();
			break;

			case "unconfirmed":
				this.scanProgress.progressbar("value", 0);
				this.scanProgress.hide();
				this.btnDownload.hide();
				this.btnStopScan.hide();
				this.btnPauseResume.hide();
				this.btnEdit.show();
				this.btnConfirmScan.show();
				this.btnScanHistory.hide();
			break;

			case "review":
				this.scanProgress.progressbar("value", 0);
				this.scanProgress.hide();

				if (this.options.data.haveResults == 1) {
					this.btnDownload.show();
					if($.browser.msie) this.btnDownload.attr('style', '');
				} else this.btnDownload.hide();

				this.btnStopScan.hide();
				this.btnPauseResume.hide();
				this.btnEdit.hide();
				this.btnConfirmScan.show();
				this.btnScanHistory.show();
			break;

			default:
				this.scanProgress.progressbar("value", 0);
				this.scanProgress.hide();
				this.btnDownload.hide();
				this.btnStopScan.hide();
				this.btnPauseResume.hide();
				this.btnEdit.hide();
				this.btnConfirmScan.hide();
		}
	},
	
	updateData : function (data) {
		this.options.data = data;
		this.updateUI();
	},
	
	sameIdAs : function (id) {
		return this.options.data.id==id;
	},

	getScanId : function () {
		return this.options.data.id;
	},

	stopScan : function (e) {
		$.ajax({
			url: "/api/stopScan",
			beforeSend: addValidationHeader,
			type: "POST",
			dataType: "json",
			contentType: "application/json", 
			data: JSON.stringify({"id" : this.options.data.id }),
			success: function (data) {lastScanListHash = ""; if(data.result != "OK") alert("Error: " + data.errorMessage);},
			error:  function (jqXHR, textStatus, errorThrown) {alert("Error: " + textStatus);} 
		});
		
		return false;
	},

	pauseOrResumeScan : function (e) {		

		switch(this.options.data.status)
		{
		case "running":
			this.pauseScan(e);
			break;
		
		case "paused":
			this.resumeScan(e);
			break;

		default:
			alert("Cannot pause or resume this can!");
			break;
		}		
		return false;
	},
	
	pauseScan : function (e) {
		$.ajax({
			url: "/api/pauseScan",
			beforeSend: addValidationHeader,
			type: "POST",
			dataType: "json",
			contentType: "application/json", 
			data: JSON.stringify({"id" : this.options.data.id }),
			success: function (data) {lastScanListHash = ""; if(data.result != "OK") alert("Error: " + data.errorMessage);},
			error:  function (jqXHR, textStatus, errorThrown) {alert("Error: " + textStatus);} 
		});
		
		return false;
	},

	resumeScan : function (e) {
		$.ajax({
			url: "/api/resumeScan",
			beforeSend: addValidationHeader,
			type: "POST",
			dataType: "json",
			contentType: "application/json", 
			data: JSON.stringify({"id" : this.options.data.id }),
			success: function (data) {lastScanListHash = ""; if(data.result != "OK") alert("Error: " + data.errorMessage);},
			error:  function (jqXHR, textStatus, errorThrown) {alert("Error: " + textStatus);} 
		});
		
		return false;
	},

	prepareScanForEdit : function (e) {
		editModeScanId = this.options.data.id;
		// single scan or list of scans
		if (this.options.data.target instanceof Array) {
			$("#scanType").val("scanList");
			$("#targetList").val(this.targetStr(false));
		}
		else {
			// web scan or web service scan?
			if (this.options.data.scanType == 'scanwsdl') $("#scanType").val("scanWSDL");
			else $("#scanType").val("scan");

			$("#target").val(this.targetStr(false));
		}
		scanTypeChange();

		// recursion type
		$("#recurse").val(this.options.data.recurse);
		recurseChange();

		// update date/time values accordingly
		var recurseType = this.options.data.recurse;
		switch(recurseType){
			case -1:	// once
				$("#date").val(this.options.data.date);
				$("#time").val(this.options.data.time);
				break;

            case 11:	// continuous
                $("#date").val(this.options.data.date);
                $("#time").val(this.options.data.time);
                break;

            case 12:	// continuous2
                $("#date").val(this.options.data.date);
                $("#time").val(this.options.data.time);
                break;

            case 0:	// every day
				$("#time").val(this.options.data.time);
				break;

			case 9:	// every week
				$("#dayOfWeek").val(this.options.data.dayOfWeek);
				$("#time").val(this.options.data.time);
				break;

			case 10:	// every month
				$("#dayOfMonth").val(this.options.data.dayOfWeek);
				$("#time").val(this.options.data.time);
				break;
		}

		// delete after completion
		if (this.options.data.deleteAfterCompletion)
			$("#deleteAfterCompletion").attr('checked', true);
		else
			$("#deleteAfterCompletion").attr('checked', false);

		// scanning profile
		$("#param_profile").val(this.options.data.profile);
		// login sequence
		$("#param_loginSeq").val(this.options.data.loginseq);
		// scan settings
		$("#param_settings").val(this.options.data.settings);
		// scan mode
		$("#param_scanningmode").val(this.options.data.scanningmode.toLowerCase());
		// excluded hours
		$("#param_excludedhours").val(this.options.data.excludedhours);

		// save scan results to database
		if (this.options.data.savetodatabase)
			$("#param_savetodatabase").attr('checked', true);
		else
			$("#param_savetodatabase").attr('checked', false);

		// save logs
		if (this.options.data.savelogs)
			$("#param_savelogs").attr('checked', true);
		else
			$("#param_savelogs").attr('checked', false);

		// generate report
		if (this.options.data.generatereport)
			$("#param_generatereport").attr('checked', true);
		else
			$("#param_generatereport").attr('checked', false);

		// report format
		$("#param_reportformat").val(this.options.data.reportformat.toUpperCase());

        // report template
        if (this.options.data.generatereport) $("#param_reporttemplate").val(this.options.data.reporttemplate);
        else $("#param_reporttemplate").val('WVSDeveloperReport.rep');

		// email address
		$("#param_emailaddress").val(this.options.data.emailaddress);

		return false;
	},

	check : function (status) {
		var shouldCheck = false;

		// have status?
		if (status != "") {
			if (this.options.data.status == status)
				shouldCheck = true;
			else {
				// some exceptions
				if (status == "crashed" && this.options.data.crashed == true)
					shouldCheck = true;

				if (status == "terminated" && (this.options.data.status == "none" && this.options.data.runCount > 0))
					shouldCheck = true;
			}
		}
		else shouldCheck = true;

		if (shouldCheck == true) $("[role=siSelection]", this.element).addClass("siSelection")
		else $("[role=siSelection]", this.element).removeClass("siSelection");

		return false;
	},

	uncheck : function (e) {

		$("[role=siSelection]", this.element).removeClass("siSelection");

		return false;
	},


	isChecked : function (e) {

		return $("[role=siSelection]", this.element).hasClass("siSelection");

	},

	mark : function (e) {

		$("[role=siSelection]", this.element).addClass("siMark");

		return false;
	},

	unmark : function (e) {

		$("[role=siSelection]", this.element).removeClass("siMark");

		return false;
	},

	expandOrCollapse : function (e) {

		var siElement = $("[role=scanInfo]", this.element);

		if (siElement.is(":visible") ) {
			this.collapse();
		}
		else {
			this.expand();
		}

		return false;
	},


	isCollapsed : function (e) {
		return this.collapsed;
	},

	expand : function (e) {

		$("[role=scanInfo]", this.element).show(SCANITEM_EFFECT);
		this.collapsed = false;
		this.updateUI();

		return false;
	},


	collapse : function (e) {

		$("[role=scanInfo]", this.element).hide(SCANITEM_EFFECT);
		this.collapsed = true;
		this.updateUI();

		return false;
	},

	showOrHide : function (matchStr) {

		var targetStrLC = this.targetStr().toLowerCase();
		var matchStrLC = matchStr.toLowerCase();

		if (matchStrLC == "" || targetStrLC.indexOf(matchStrLC) != -1)
			$(this.element).show(SCANITEM_EFFECT);
		else
			$(this.element).hide(SCANITEM_EFFECT);

		return false;
	},

	deleteSchedule : function (e) {
		var self = this;

		$( "#dialog:ui-dialog" ).dialog( "destroy" );
		$( "#deleteScheduleDialog" ).dialog({
			resizable: false,
			height:160,
			modal: true,
			buttons: {
				"Delete": function() {
					var deleteScanResults = 0;
					if ($( "#dsdDeleteResults").is(':checked')) deleteScanResults = 1;

					$.ajax({
						url: "/api/deleteScan",
						beforeSend: addValidationHeader,
						type: "POST",
						dataType: "json",
						contentType: "application/json",
						data: JSON.stringify({"id" : self.options.data.id, "deleteScanResults":deleteScanResults }),
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

		return false;
	},
	
	openScanHistory : function (e){
		$('#scanHistoryDialog')
			.data('link', this)
			.dialog('open');		
	},

	openScanResults : function (e){
		$('#scanResultsDialog')
			.data('link', this)
			.dialog('open');
	},

	suicide : function(){
		$(this.element).remove();
	},
	
	deleteItem : function () {
		this.deleted = true;
	},
	
	undeleteItem : function () {
		this.deleted = false;
	},
	
	isDeleted : function () {
		return this.deleted;
	},

	recurseStr: function () {
		 var result = "";
		
		 if (this.options.data.recurse == -1)
			 result = 'Run once on ' + this.options.data.date + ' at ' + this.options.data.time;
		 else
			 if (this.options.data.recurse == 0)
				 result = 'Run every day at ' + this.options.data.time;
			 else
				 if (this.options.data.recurse == 9)
					 result = 'Run every week (on day ' + this.options.data.dayOfWeek + ' at ' + this.options.data.time + ')';
				 else
					 if (this.options.data.recurse == 10)
						 result = 'Run every month (on day ' + this.options.data.dayOfWeek + ' at ' + this.options.data.time + ')';
					 else
					 if (this.options.data.recurse == 11)
						 result = 'Run once when a WVS instance is available';
						 else
						 if (this.options.data.recurse == 12)
							 result = 'Run once on ' + this.options.data.date + ' at ' + this.options.data.time;

		// process rescheduling
		if (this.options.data.rescheduled == 1){
			// scan was rescheduled
			result += " (Rescheduled on " + this.options.data.reschdate + ' at ' + this.options.data.reschtime + ")";
		}		 
		 
		return result;	
	},

	minPassedStr: function () {
		var result = "";
		
		if (this.options.data.status == "running" && this.options.data.minPassed > 0) {
			result = this.options.data.minPassed + " minutes";
		}	
		
		return result;	
	},
	
	statusStr : function () {
		var result = "";

		this.scanStatus.removeClass('redText');
		
		switch(this.options.data.status)
		{
		case "terminated":
			result = 'Scan finished';
			break;
		
		case "running":
			result = 'Scanning in progress';
			var minRunning = this.minPassedStr();
			if (minRunning.length > 0) result = result + " (" + minRunning + ")";
			break;

		case "paused":
			result = 'Scan is paused';
			break;

        case "stopping":
            result = 'Scan is stopping ...';
            break;

        case "none":
            result = 'Scan is scheduled';

            if (this.options.data.rescheduled == 1)
                result = 'Scan is rescheduled';

            break;

		case "unconfirmed":
			result = 'Scan needs confirmation';
			this.scanStatus.addClass('redText');

			break;

		case "review":
			result = 'Scan results needs approval';
			this.scanStatus.addClass('redText');

			break;

		default:
			result = 'Unknown state';
			break;
		}

		if (this.options.data.status == "terminated" || this.options.data.status == "none") {
			if (this.options.data.runCount > 0)
				result = result + " (" + this.options.data.runCount + " runs)";
		}
		
		if (this.options.data.crashed == true) {
			result = result + " [process crashed]";
		}
		
		return result;
	},

	targetStr : function (forTitle) {
		var result = "";
		
		var separator = forTitle ? ", " : "\n";
		
		if(this.options.data.target instanceof Array) {
			for(var i in this.options.data.target)
				result += separator + this.options.data.target[i];
			
			if(result != "")result = result.slice(separator.length);
		}
		else result = this.options.data.target;

		// if collapsed include the status in title
		if (this.isCollapsed()) result = result + "   - " + this.statusStr();

		return result;
	},

	confirmScan : function () {
		$.ajax({
			url: "/api/confirmScans",
			beforeSend: addValidationHeader,
			type: "POST",
			dataType: "json",
			contentType: "application/json",
			data: JSON.stringify({"id" : [this.options.data.id] }),
			success: function (data) {lastScanListHash = ""; if(data.result != "OK") alert("Error: " + data.errorMessage);},
			error:  function (jqXHR, textStatus, errorThrown) {alert("Error: " + textStatus);}
		});
	}
});