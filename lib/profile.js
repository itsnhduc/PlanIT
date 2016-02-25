if (Meteor.isClient) {

	Template.profile.helpers({
		'email': function() {
			console.log('yes');
			return this.emails[0].address;
		},
		'isOwner': function() {
			return this._id == Meteor.userId();
		}
	});

	Template.profile.events({
		'click #settings': function(event) {
			event.preventDefault();
			Router.go('/user/' + this._id + '/settings');
		}
	});

}