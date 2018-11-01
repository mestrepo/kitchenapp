Meteor.publish("kitchenstaff_list", function() {
	return Kitchenstaff.find({}, {});
});

Meteor.publish("kitchenstaff_null", function() {
	return Kitchenstaff.find({_id:null}, {});
});

Meteor.publish("kitchenstaff", function(kitchenstaffId) {
	return Kitchenstaff.find({_id:kitchenstaffId}, {});
});

Meteor.publish("kitchenstaff_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Kitchenstaff.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("kitchenstaff_list_paged_count", function(extraOptions) {
	Counts.publish(this, "kitchenstaff_list_paged_count", Kitchenstaff.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"kitchenstaffListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Kitchenstaff.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

