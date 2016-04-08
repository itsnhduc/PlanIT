Meteor.methods({
	'updateProfile': function(firstname, lastname, email) {
		Meteor.users.update({_id: Meteor.userId()}, {$set: wrap});
	},
	'removeAccount': function(id) {
		Meteor.users.remove({_id: id});
	}
});