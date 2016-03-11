if (Meteor.isClient) {

	Template.newsfeed.helpers({
		'plans': function() {
			return Plans.find({});
		}
	});

}