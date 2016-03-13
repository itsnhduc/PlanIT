if (Meteor.isClient) {

	Template.profile.helpers({
		'email': function() {
			return this.emails[0].address;
		},
		'isOwner': function() {
			return this._id == Meteor.userId();
		},
		'plans': function() {
			return Plans.find({createdBy: this._id});
		}
	});

	Template.profile.events({
		'click #settings': function(event) {
			event.preventDefault();
			Router.go('/user/' + this._id + '/settings');
		}
	});

}