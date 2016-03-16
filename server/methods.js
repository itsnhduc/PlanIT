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
			Meteor.users.update({_id: targetId}, {$addToSet: {
				'profile.notifications': {
					userId: Meteor.userId(),
					action: 'friend request'
				}
			}});
		},
		'removeFriendRecord': function(targetId, isUnFriend) {
			Meteor.users.update({_id: targetId}, {$pull: {
				'profile.friends': {
					_id: Meteor.userId()
				}
			}});
			if (isUnFriend) {
				Meteor.users.update({_id: Meteor.userId()}, {$pull: {
					'profile.friends': {
						_id: targetId
					}
				}});
				Meteor.users.update({_id: Meteor.userId()}, {$pull: {
					'profile.notifications': {
						userId: targetId,
						action: 'friend confirm'
					}
				}});
			} else {
				Meteor.users.update({_id: targetId}, {$pull: {
					'profile.notifications': {
						userId: targetId,
						action: 'friend request'
					}
				}});
			}
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
			Meteor.users.update({_id: requesterId}, {$pull: {
				'profile.notifications': {
					userId: Meteor.userId(),
					action: 'friend request'
				}
			}});
			Meteor.users.update({_id: requesterId}, {$addToSet: {
				'profile.notifications': {
					userId: Meteor.userId(),
					action: 'friend confirm'
				}
			}});
		}
	});
}