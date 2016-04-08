Template.planShort.helpers({
	'organizer': function() {
		if (this.createdBy == Meteor.userId()) {
			return 'You';
		} else {
			var user = Meteor.users.findOne(this.createdBy);
			return getFullName(user);
		}
	}
});