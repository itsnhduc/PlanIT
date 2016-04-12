// >>>>>>>> Profile Info <<<<<<<<
getFullName = function(user) {
	return user.profile.firstname + ' ' + user.profile.lastname;
}

getFriendsIds = function() {
	var friendList = Meteor.user().profile.friends;
	var idList = [];
	for (var i = 0; i < friendList.length; i++) {
		idList.push(friendList[i]._id);
	}
	return idList;
}

getProfilePlans = function(user) {
	var entries = Plans.find({createdBy: user._id}, {$or: [{
		visibility: 'public' // public plan
	}, {
		createdBy: Meteor.userId() // own plan
	}, {
		visibility: 'friends',
		createdBy: {$in: getFriendsIds()}
	}, {
		'participants.userId': Meteor.userId() // plans in which user is a participant
	}]});
	return {
		entries: entries,
		count: entries.fetch().length
	}
}

getEmail = function(user) {
	return user.emails[0].address;
}

isProfileOwner = function(user) {
	return user._id == Meteor.userId()
}

getFriends = function(user) {
	var friendList = user.profile.friends;
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
	return {
		entries: friends,
		count: friends.length
	};
}

isBeingRequested = function(user) {
	var friendList = Meteor.user().profile.friends;
	var curId = user._id;
	for (var i = 0; i < friendList.length; i++) {
		curFriend = friendList[i];
		if (curFriend._id == curId && curFriend.isConfirmed == false) {
			return true;
		}
	}
	return false; // default value
}

isFriend = function(user) {
	var friendList = user.profile.friends;
	var curId = Meteor.userId();
	for (var i = 0; i < friendList.length; i++) {
		curFriend = friendList[i];
		if (curFriend._id == curId && curFriend.isConfirmed == true) {
			return true;
		}
	}
	return false;
}

hasRequested = function(user) {
	var friendList = user.profile.friends;
	var curId = Meteor.userId();
	for (var i = 0; i < friendList.length; i++) {
		curFriend = friendList[i];
		if (curFriend._id == curId && curFriend.isConfirmed == false) {
			return true;
		}
	}
	return false; // default value
}

cancelFriendRequest = function(user) {
	Meteor.call('removeFriendRecord', user._id, false);
}

acceptFriendRequest = function(user) {
	Meteor.call('confirmFriend', user._id);
}

sendFriendRequest = function(user) {
	Meteor.call('addFriend', user._id);
}

unfriend = function(user) {
	if (confirm('Unfriend this person?')) {
		Meteor.call('removeFriendRecord', user._id, true);
	}
}

// >>>>>>>> Profile Settings <<<<<<<<
getEmailAddress = function(plan) {
	return plan.emails[0].address;
}

editProfile = function(user) {
	var firstname = $('#firstname').val();
	var lastname = $('#lastname').val();
	var email = $('#email').val();

	var passwordOld = $('#password-old').val();
	var passwordNew = $('#password-new').val();

	checkAuthError([email, passwordOld, passwordNew, firstname, lastname], 'profile', function() {
		var wrap = {
			emails: [{address: email, verified: false}],
			'profile.firstname': firstname,
			'profile.lastname': lastname
		};
		Meteor.call('updateProfile', wrap);

		if (passwordOld != '' && passwordNew != '') {
			Accounts.changePassword(passwordOld, passwordNew);
		}
		Router.go('/user/' + user._id);
	});



}

deleteAccount = function(user) {
	if (confirm('Are you sure you want to delete your account?')) {
		Meteor.logout(function(err) {
			if (err) {
				throw new Meteor.Error('Logout failed.');
			} else {
				Meteor.call('removeAccount', user._id);
				Router.go('/home');
			}
		});
	}
}