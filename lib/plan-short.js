if (Meteor.isClient) {

	Template.planShort.helpers({
		'organizer': function() {
			var user = Meteor.users.findOne(this.createdBy);
			return user.profile.firstname + ' ' + user.profile.lastname;
		}
	});

}