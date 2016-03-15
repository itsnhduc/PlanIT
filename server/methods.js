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
		},
		'addFriend': function(targetId) {
			Meteor.users.update({_id: targetId}, {$addToSet: {
				'profile.friends': {
					_id: Meteor.userId(),
					isConfirmed: false
				}
			}});
		},
		'removeFriendRecord': function(targetId) {
			Meteor.users.update({_id: targetId}, {$pull: {
				'profile.friends': {
					_id: Meteor.userId()
				}
			}});
			Meteor.users.update({_id: Meteor.userId()}, {$pull: {
				'profile.friends': {
					_id: targetId
				}
			}});
		},
		'confirmFriend': function(requesterId) {
			Meteor.users.update({_id: Meteor.userId()}, {$pull: {
				'profile.friends': {
					_id: requesterId
				}
			}});
			Meteor.users.update({_id: Meteor.userId()}, {$addToSet: {
				'profile.friends': {
					_id: requesterId,
					isConfirmed: true
				}
			}});
			Meteor.users.update({_id: requesterId}, {$addToSet: {
				'profile.friends': {
					_id: Meteor.userId(),
					isConfirmed: true
				}
			}});
		}
	});
}