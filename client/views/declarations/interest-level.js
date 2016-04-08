Template.interestLevel.events({
	'click .going': function(event) {
		event.preventDefault();
		changeStatus('going', this);
	},
	'click .interested': function(event) {
		event.preventDefault();
		changeStatus('interested', this);
	},
	'click .not-going': function(event) {
		event.preventDefault();
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
	}
});