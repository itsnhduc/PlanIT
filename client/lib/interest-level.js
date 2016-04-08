var changeStatus = function(newStatus, plan) {
	Meteor.call('indicateStatus', plan._id, Meteor.userId(), newStatus);
}

var getStatusColor = function(status, participants) {
	var userId = Meteor.userId();
	for (var i = 0; i < participants.length; i++) {
		var user = participants[i];
		if (user.userId == userId && user.status == status) {
			return 'primary';
		}
	}
	return 'default';
}

Template.interestLevel.events({
	'click .going': function(event) {
		changeStatus('going', this);
	},
	'click .interested': function(event) {
		changeStatus('interested', this);
	},
	'click .not-going': function(event) {
		changeStatus('not going', this);
	}
});

Template.interestLevel.helpers({
	'colorGoing': function() {
		return getStatusColor('going', this.participants);
	},
	'colorInterested': function() {
		return getStatusColor('interested', this.participants);
	},
	'colorNotGoing': function() {
		return getStatusColor('not going', this.participants);
	},
	'showBtnGroup': function() {
		if (this.createdBy == Meteor.userId()) {
			return false;
		} else {
			return true;
		}
	}
});