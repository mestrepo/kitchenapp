Template.AdminKitchenstaff.onCreated(function() {
	
});

Template.AdminKitchenstaff.onDestroyed(function() {
	
});

Template.AdminKitchenstaff.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AdminKitchenstaff.events({
	
});

Template.AdminKitchenstaff.helpers({
	
});


var AdminKitchenstaffViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("KitchenstaffListPagedSearchString") || "",
		searchFields: Session.get("KitchenstaffListPagedSearchFields") || ["name", "email"],
		sortBy: Session.get("KitchenstaffListPagedSortBy") || "",
		sortAscending: Session.get("KitchenstaffListPagedSortAscending") || true
	};

	var exportFields = [];

	

	Meteor.call("kitchenstaffListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.AdminKitchenstaffView.onCreated(function() {
	
});

Template.AdminKitchenstaffView.onDestroyed(function() {
	
});

Template.AdminKitchenstaffView.onRendered(function() {
	Session.set("AdminKitchenstaffViewStyle", "table");
	
});

Template.AdminKitchenstaffView.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).closest("form");
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				Session.set("KitchenstaffListPagedSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).closest("form");
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					Session.set("KitchenstaffListPagedSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).closest("form");
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					Session.set("KitchenstaffListPagedSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("admin.kitchenstaff.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		AdminKitchenstaffViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AdminKitchenstaffViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AdminKitchenstaffViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AdminKitchenstaffViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("KitchenstaffListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("KitchenstaffListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("KitchenstaffListPagedPageNo") || 0;
		if(currentPage < this.kitchenstaff_list_paged_page_count - 1) {
			Session.set("KitchenstaffListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.AdminKitchenstaffView.helpers({

	"insertButtonClass": function() {
		return Kitchenstaff.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.kitchenstaff_list_paged || this.kitchenstaff_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.kitchenstaff_list_paged && this.kitchenstaff_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.kitchenstaff_list_paged && this.kitchenstaff_list_paged.count() == 0 && Session.get("KitchenstaffListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("KitchenstaffListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("KitchenstaffListPagedPageNo") || 0) < this.kitchenstaff_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("KitchenstaffListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("AdminKitchenstaffViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("AdminKitchenstaffViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("AdminKitchenstaffViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("AdminKitchenstaffViewStyle") == "gallery";
	}

	
});


Template.AdminKitchenstaffViewTable.onCreated(function() {
	
});

Template.AdminKitchenstaffViewTable.onDestroyed(function() {
	
});

Template.AdminKitchenstaffViewTable.onRendered(function() {
	
});

Template.AdminKitchenstaffViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("KitchenstaffListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("KitchenstaffListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("KitchenstaffListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("KitchenstaffListPagedSortAscending", !sortAscending);
		} else {
			Session.set("KitchenstaffListPagedSortAscending", true);
		}
	}
});

Template.AdminKitchenstaffViewTable.helpers({
});


Template.AdminKitchenstaffViewTableItems.onCreated(function() {
	
});

Template.AdminKitchenstaffViewTableItems.onDestroyed(function() {
	
});

Template.AdminKitchenstaffViewTableItems.onRendered(function() {
	
});

Template.AdminKitchenstaffViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("admin.kitchenstaff.details", mergeObjects(Router.currentRouteParams(), {kitchenstaffId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("kitchenstaffUpdate", this._id, values, function(err, res) {
			if(err) {
				alert(err.message);
			}
		});

		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Meteor.call("kitchenstaffRemove", me._id, function(err, res) {
							if(err) {
								alert(err.message);
							}
						});
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	},
	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("admin.kitchenstaff.update", mergeObjects(Router.currentRouteParams(), {kitchenstaffId: this._id}));
		return false;
	}
});

Template.AdminKitchenstaffViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Kitchenstaff.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Kitchenstaff.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
