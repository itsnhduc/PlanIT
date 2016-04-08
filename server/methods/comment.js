if (Meteor.isServer) {
	Meteor.methods({
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
			if (plan.createdBy != comment.createdBy) {
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