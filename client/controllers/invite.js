var inviteList = [];

inviteFriends = function(plan) {
	var addNoti = [];
	var planId = plan._id;

	for (var i = 0; i < inviteList.length; i++) {
		addNoti.push({
			userId: Meteor.userId(),
			action: 'invite',
			planId: planId,
		});
	}

	Meteor.call('inviteFriends', inviteList, addNoti, function(err) {
		if (err) {
			throw new Meteor.Error(err);
		} else {
			Router.go('/plan/' + planId);
		}
	});
}

toggleInviteList = function(selector, friend) {
	if (!$(selector).hasClass('btn-primary')) {
		$(selector).removeClass('btn-default');
		$(selector).addClass('btn-primary');
		inviteList.push(friend._id);
	} else {
		$(selector).removeClass('btn-primary');
		$(selector).addClass('btn-default');
		inviteList = removeArrayElement(inviteList, friend._id);
	}
}

removeArrayElement = function(array, content) {
	var ret = [];
	for (var i = 0; i < array.length; i++) {
		if (array[i] != content) {
			ret.push(array[i]);
		}
	}
	return ret;
}