if (Meteor.isClient) {

	Template.plan.helpers({
		'organizer': function() {
			var user = Meteor.users.findOne(this.createdBy);
			return user.profile.firstname + ' ' + user.profile.lastname;
		},
		'isOwner': function() {
			return this.createdBy == Meteor.userId();
		}
	});

	Template.plan.events({
		'click #settings': function(event) {
			event.preventDefault();
			Router.go('/plan/' + this._id + '/settings');
		}
	});

}