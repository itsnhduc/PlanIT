Template.profile.helpers({
	'plans': function() {
		return getProfilePlans(this);
	},
	'email': function() {
		return getEmail(this);
	},
	'isOwner': function() {
		return isProfileOwner(this);
	},
	friends: function() {
		return getFriends(this);
	},
	'isBeingRequested': function() {
		return isBeingRequested(this);
	},
	'isFriend': function() {
		return isFriend(this);
	},
	'hasRequested': function() {
		return hasRequested(this);
	}
});

Template.profile.events({
	'click #settings': function(event) {
		event.preventDefault();
		Router.go('/user/' + this._id + '/settings');
	},
	'mouseenter #cancel-request': function() {
		$('#cancel-request').text(String.fromCharCode(215) + ' Cancel friend request');
		$('#cancel-request').removeClass('btn-success');
		$('#cancel-request').addClass('btn-danger');
	},
	'mouseleave #cancel-request': function() {
		$('#cancel-request').text(String.fromCharCode(10003) + ' Friend request sent');
		$('#cancel-request').removeClass('btn-danger');
		$('#cancel-request').addClass('btn-success');
	},
	'click #cancel-request': function(event) {
		event.preventDefault();
		cancelFriendRequest(this);
	},
	'click #accept-request': function(event) {
		event.preventDefault();
		acceptFriendRequest(this);
	},
	'click #add-friend': function(event) {
		event.preventDefault();
		sendFriendRequest(this);
	},
	'click #unfriend': function(event) {
		event.preventDefault();
		unfriend(this);
	}
});