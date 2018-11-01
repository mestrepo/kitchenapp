var pageSession = new ReactiveDict();

Template.AdminKitchenstaffDetails.onCreated(function() {
	
});

Template.AdminKitchenstaffDetails.onDestroyed(function() {
	
});

Template.AdminKitchenstaffDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AdminKitchenstaffDetails.events({
	
});

Template.AdminKitchenstaffDetails.helpers({
	
});

Template.AdminKitchenstaffDetailsForm.onCreated(function() {
	
});

Template.AdminKitchenstaffDetailsForm.onDestroyed(function() {
	
});

Template.AdminKitchenstaffDetailsForm.onRendered(function() {
	

	pageSession.set("adminKitchenstaffDetailsFormInfoMessage", "");
	pageSession.set("adminKitchenstaffDetailsFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
});

Template.AdminKitchenstaffDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminKitchenstaffDetailsFormInfoMessage", "");
		pageSession.set("adminKitchenstaffDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var adminKitchenstaffDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(adminKitchenstaffDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminKitchenstaffDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminKitchenstaffDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		Router.go("admin.kitchenstaff", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("admin.kitchenstaff", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.AdminKitchenstaffDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminKitchenstaffDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminKitchenstaffDetailsFormErrorMessage");
	}
	
});
