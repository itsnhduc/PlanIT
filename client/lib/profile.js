Template.profile.helpers({
	'plans': function() {
		return Plans.find({createdBy: this._id});
	},
	'email': function() {
		return this.emails[0].address;
	},
	'isOwner': function() {
		return this._id == Meteor.userId();
	},
	friends: function() {
		var friendList = this.profile.friends;
		var friends = [];
		for (var i = 0; i < friendList.length; i++) {
			var curFriendId = friendList[i]._id;
			var curFriendFirstName = Meteor.users.findOne(curFriendId).profile.firstname;
			var curFriendLastName = Meteor.users.findOne(curFriendId).profile.lastname;
			friends.push({
				_id: curFriendId,
				name: curFriendFirstName + ' ' + curFriendLastName
			});
		}
		return friends;
	},
	'isBeingRequested': function() {
		var friendList = Meteor.user().profile.friends;
		var curId = this._id;
		for (var i = 0; i < friendList.length; i++) {
			curFriend = friendList[i];
			if (curFriend._id == curId && curFriend.isConfirmed == false) {
				return true;
			}
		}
		return false; // default value
	},
	'isFriend': function() {
		var friendList = this.profile.friends;
		var curId = Meteor.userId();
		for (var i = 0; i < friendList.length; i++) {
			curFriend = friendList[i];
			if (curFriend._id == curId && curFriend.isConfirmed == true) {
				return true;
			}
		}
		return false;
	},
	'hasRequested': function() {
		var friendList = this.profile.friends;
		var curId = Meteor.userId();
		for (var i = 0; i < friendList.length; i++) {
			curFriend = friendList[i];
			if (curFriend._id == curId && curFriend.isConfirmed == false) {
				return true;
			}
		}
		return false; // default value
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
		Meteor.call('removeFriendRecord', this._id, false);
	},
	'click #accept-request': function(event) {
		event.preventDefault();
		Meteor.call('confirmFriend', this._id);
	},
	'click #add-friend': function(event) {
		event.preventDefault();
		Meteor.call('addFriend', this._id);
	},
	'click #unfriend': function(event) {
		event.preventDefault();
		if (confirm('Unfriend this person?')) {
			Meteor.call('removeFriendRecord', this._id, true);
		}
	}

});