Template.invite.helpers({
	'friends': function() {
		return getFriends(Meteor.user()).entries;
	}
});

Template.invite.events({
	'click .friend': function(event) {
		event.preventDefault();
		toggleInviteList('#friend-' + this._id, this);
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
		inviteFriends(this);		
	}
});

