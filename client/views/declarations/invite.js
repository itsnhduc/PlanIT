Template.invite.helpers({
	'friends': function() {
		return getFriends(Meteor.user()).entries;
	}
});

Template.invite.events({
	'click .friend': function(event) {
		event.preventDefault();
		var selector = '#friend-' + this._id;
		toggleInviteList(selector, this);
	},
	'click #select-all': function(event) {
		event.preventDefault();
		$.each($('.friend'), function(key, value) {
			if ($(value).hasClass('btn-default')) {
				toggleInviteList('#' + value.id, {
					_id: value.id.split('-')[1]
				});
			}
		});
	},
	'click #clear-all': function(event) {
		event.preventDefault();
		$.each($('.friend'), function(key, value) {
			if (!$(value).hasClass('btn-default')) {
				toggleInviteList('#' + value.id, {
					_id: value.id.split('-')[1]
				});
			}
		});
	},
	'click #invite': function(event) {
		event.preventDefault();

		var addNoti = [];
		var planId = this._id;

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
});

var inviteList = [];

var toggleInviteList = function(selector, friend) {
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

var removeArrayElement = function(array, content) {
	var ret = [];
	for (var i = 0; i < array.length; i++) {
		if (array[i] != content) {
			ret.push(array[i]);
		}
	}
	return ret;
}