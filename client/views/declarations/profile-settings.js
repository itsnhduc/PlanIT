Template.profileSettings.helpers({
	'email': function() {
		return getEmailAddress(this);
	}
});

Template.profileSettings.events({
	'click #submit': function(event) {
		event.preventDefault();
		editProfile(this);
	},
	'click #delete': function(event) {
		event.preventDefault();
		deleteAccount(this)
	}
});