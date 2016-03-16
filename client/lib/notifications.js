if (Meteor.isClient) {

	var generateActionNoti = function(actionType) {
		switch (actionType) {
			case 'friend request':
				return 'has sent you a friend request.'
			case 'friend confirm':
				return 'has confirmed your friend request.'
			default:
				return '(error)'
		}
	}

	Template.notifications.helpers({
		'notifications': function() {
			var pool = Meteor.user().profile.notifications;
			var notifications = [];
			for (var i = 0; i < pool.length; i++) {
				var curNoti = pool[i];
				var targetUser = Meteor.users.findOne(curNoti.userId);
				notifications.push({
					name: targetUser.profile.firstname + ' ' + targetUser.profile.lastname,
					action: generateActionNoti(curNoti.action)
				});
			}
			return notifications;
		}
	});

}