var generateActionNoti = function(actionType) {
	switch (actionType) {
		case 'friend request':
			return 'has sent you a friend request';
		case 'friend confirm':
			return 'has confirmed your friend request';
		case 'comment':
			return 'commented on ';
		case 'status going':
			return 'is going to ';
		case 'status interested':
			return 'is interested in ';
		case 'invite':
			return 'has invited you to join ';
		default:
			return '(error)'
	}
}

getNotifications = function() {
	var pool = Meteor.user().profile.notifications;
	var notifications = [];
	for (var i = 0; i < pool.length; i++) {
		var curNoti = pool[i];
		var targetUser = Meteor.users.findOne(curNoti.userId);
		var additionalElements = {
			name: getFullName(targetUser),
			targetUserId: targetUser._id,
			action: generateActionNoti(curNoti.action),
			empty: false
		}
		if (curNoti.planId) {
			additionalElements.planId = curNoti.planId;
			additionalElements.planName = Plans.findOne(curNoti.planId).title;
		}
		notifications.push(additionalElements);
	}
	if (notifications.length == 0) {
		notifications.push({
			empty: true
		});
	}
	return notifications.reverse();
}