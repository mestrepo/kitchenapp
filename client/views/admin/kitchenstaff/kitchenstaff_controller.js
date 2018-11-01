this.AdminKitchenstaffController = RouteController.extend({
	template: "Admin",
	

	yieldTemplates: {
		'AdminKitchenstaff': { to: 'AdminSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("Admin"); this.render("loading", { to: "AdminSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.kitchenstaffListPagedExtraParams = {
			searchText: Session.get("KitchenstaffListPagedSearchString") || "",
			searchFields: Session.get("KitchenstaffListPagedSearchFields") || ["name", "email"],
			sortBy: Session.get("KitchenstaffListPagedSortBy") || "",
			sortAscending: Session.get("KitchenstaffListPagedSortAscending"),
			pageNo: Session.get("KitchenstaffListPagedPageNo") || 0,
			pageSize: Session.get("KitchenstaffListPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("kitchenstaff_list_paged", this.kitchenstaffListPagedExtraParams),
			Meteor.subscribe("kitchenstaff_list_paged_count", this.kitchenstaffListPagedExtraParams)
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		

		var data = {
			params: this.params || {},
			kitchenstaff_list_paged: Kitchenstaff.find(databaseUtils.extendFilter({}, this.kitchenstaffListPagedExtraParams), databaseUtils.extendOptions({}, this.kitchenstaffListPagedExtraParams)),
			kitchenstaff_list_paged_count: Counts.get("kitchenstaff_list_paged_count")
		};
		

		
		data.kitchenstaff_list_paged_page_count = this.kitchenstaffListPagedExtraParams && this.kitchenstaffListPagedExtraParams.pageSize ? Math.ceil(data.kitchenstaff_list_paged_count / this.kitchenstaffListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.kitchenstaffListPagedExtraParams.pageNo >= data.kitchenstaff_list_paged_page_count) {
			Session.set("KitchenstaffListPagedPageNo", data.kitchenstaff_list_paged_page_count > 0 ? data.kitchenstaff_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});