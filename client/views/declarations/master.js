Template.master.events({
	'click #logout': function(event) {
		event.preventDefault();
		logout();
	},
	'click #profile-settings': function(event) {
		event.preventDefault();
		Router.go('/user/' + Meteor.userId() + '/settings');
	}
});