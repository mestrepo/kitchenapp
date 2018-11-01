this.AdminKitchenstaffUpdateController = RouteController.extend({
	template: "Admin",
	

	yieldTemplates: {
		'AdminKitchenstaffUpdate': { to: 'AdminSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("Admin"); this.render("loading", { to: "AdminSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {


		

		var subs = [
			Meteor.subscribe("kitchenstaff", this.params.kitchenstaffId)
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
			kitchenstaff: Kitchenstaff.findOne({_id:this.params.kitchenstaffId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});