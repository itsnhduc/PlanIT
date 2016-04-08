if (Meteor.isServer) {
	Meteor.methods({
		'updateProfile': function(firstname, lastname, email) {
			Meteor.users.update({_id: Meteor.userId()}, {$set: {
				emails: [{address: email, verified: false}],
				profile: {
					firstname: firstname,
					lastname: lastname
				}
			}});
		},
		'removeAccount': function(id) {
			Meteor.users.remove({_id: id});
		}
	});
}