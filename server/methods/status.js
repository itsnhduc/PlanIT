if (Meteor.isServer) {
	Meteor.methods({
		'indicateStatus': function(planId, userId, newStatus) {
			if (Plans.findOne({_id: planId, 'participants.userId': userId})) {
				Plans.update({
					_id: planId,
					'participants.userId': userId
				}, {$set: {
					'participants.$.status': newStatus
				}});
			} else {
				Plans.update(planId, {$push: {
					participants: {
						userId: userId,
						status: newStatus
					}
				}});
			}
		}
	});
}