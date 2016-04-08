Template.home.events({
	'click #login': function(event) {
		event.preventDefault();
		login();
	},
	'click #register': function(event) {
		event.preventDefault();
		register();
	}
});