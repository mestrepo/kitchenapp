this.Kitchenstaff = new Mongo.Collection("kitchenstaff");

this.Kitchenstaff.userCanInsert = function(userId, doc) {
	return true;
};

this.Kitchenstaff.userCanUpdate = function(userId, doc) {
	return true;
};

this.Kitchenstaff.userCanRemove = function(userId, doc) {
	return true;
};
