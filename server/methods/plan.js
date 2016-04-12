Meteor.methods({
	'addPlan': function(wrap) {
		Plans.insert(wrap);
	},
	'updatePlan': function(planId, wrap) {
		Plans.update(planId, {$set: wrap});
	},
	'deletePlan': function(planId) {
		Plans.remove(planId);
	},
	'inviteFriends': function(inviteList, arr) {
		for (var i = 0; i < arr.length; i++) {
			var noInviteYet = Meteor.users.find({
				_id: inviteList[i],
				'profile.notifications.action': 'invite',
				'profile.notifications.planId': arr[i].planId
			}).fetch()[0];
			if (!noInviteYet) {
				Meteor.users.update(inviteList[i], {$addToSet: {
					'profile.notifications': arr[i]
				}});
			}
		}
	}
});