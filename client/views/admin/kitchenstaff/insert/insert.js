var pageSession = new ReactiveDict();

Template.AdminKitchenstaffInsert.onCreated(function() {
	
});

Template.AdminKitchenstaffInsert.onDestroyed(function() {
	
});

Template.AdminKitchenstaffInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AdminKitchenstaffInsert.events({
	
});

Template.AdminKitchenstaffInsert.helpers({
	
});

Template.AdminKitchenstaffInsertForm.onCreated(function() {
	
});

Template.AdminKitchenstaffInsertForm.onDestroyed(function() {
	
});

Template.AdminKitchenstaffInsertForm.onRendered(function() {
	

	pageSession.set("adminKitchenstaffInsertFormInfoMessage", "");
	pageSession.set("adminKitchenstaffInsertFormErrorMessage", "");

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

Template.AdminKitchenstaffInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminKitchenstaffInsertFormInfoMessage", "");
		pageSession.set("adminKitchenstaffInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var adminKitchenstaffInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(adminKitchenstaffInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminKitchenstaffInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("admin.kitchenstaff", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminKitchenstaffInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("kitchenstaffInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("admin.kitchenstaff", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.AdminKitchenstaffInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminKitchenstaffInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminKitchenstaffInsertFormErrorMessage");
	}
	
});
