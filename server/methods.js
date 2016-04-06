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
				Meteor.users.update({_id: targetId}, {$pull: {
					'profile.notifications': {
						userId: Meteor.userId(),
						action: 'friend confirm'
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
			Meteor.users.update({_id: Meteor.userId()}, {$pull: {
				'profile.notifications': {
					userId: requesterId,
					action: 'friend request'
				}
			}});
			Meteor.users.update({_id: requesterId}, {$addToSet: {
				'profile.notifications': {
					userId: Meteor.userId(),
					action: 'friend confirm'
				}
			}});
		},
		'addComment': function(plan, text) {
			Plans.update(plan._id, {$addToSet: {
				comments: {
					createdBy: Meteor.userId(),
					text: text
				}
			}});
			if (plan.createdBy != Meteor.userId()) {
				Meteor.users.update({_id: plan.createdBy}, {$addToSet: {
					'profile.notifications': {
						userId: Meteor.userId(),
						action: 'comment',
						planId: plan._id
					} 
				}});
			}
		},
		'deleteComment': function(plan, comment) {
			Plans.update({_id: plan._id}, {$pull: {
				comments: {
					createdBy: comment.createdBy,
					text: comment.text
				}
			}});
			console.log(comment.createdBy);
			console.log(plan.createdBy);
			if (plan.createdBy != comment.createdBy) {
				console.log('yes');
				Meteor.users.update({_id: plan.createdBy}, {$pull: {
					'profile.notifications': {
						userId: comment.createdBy,
						action: 'comment',
						planId: plan._id
					} 
				}});
			}
		}
	});
}