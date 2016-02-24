if (Meteor.isClient) {

	Template.plan.events({
		'click #settings': function(event) {
			event.preventDefault();
			Router.go('/plan/' + this._id + '/settings');
		}
	});

}