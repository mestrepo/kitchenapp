Meteor.methods({
	"kitchenstaffInsert": function(data) {
		if(!Kitchenstaff.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Kitchenstaff.insert(data);
	},

	"kitchenstaffUpdate": function(id, data) {
		var doc = Kitchenstaff.findOne({ _id: id });
		if(!Kitchenstaff.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Kitchenstaff.update({ _id: id }, { $set: data });
	},

	"kitchenstaffRemove": function(id) {
		var doc = Kitchenstaff.findOne({ _id: id });
		if(!Kitchenstaff.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Kitchenstaff.remove({ _id: id });
	}
});
