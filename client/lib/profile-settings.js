Template.profileSettings.helpers({
	'email': function() {
		return this.emails[0].address;
	}
});

Template.profileSettings.events({
	'click #submit': function(event) {
		event.preventDefault();

		var firstname = $('#firstname').val();
		var lastname = $('#lastname').val();
		var email = $('#email').val();

		var wrap = {
			emails: [{address: email, verified: false}],
			profile: {
				firstname: firstname,
				lastname: lastname
			}
		}

		Meteor.call('updateProfile', wrap);

		var passwordOld = $('#password-old').val();
		var passwordNew = $('#password-new').val();

		if (passwordOld != '' && passwordNew != '') {
			Accounts.changePassword(passwordOld, passwordNew);
		}

		Router.go('/user/' + this._id);
	},
	'click #delete': function(event) {
		event.preventDefault();
		if (confirm('Are you sure you want to delete your account?')) {
			Meteor.logout(function(err) {
				if (err) {
					throw new Meteor.Error('Logout failed.');
				} else {
					Meteor.call('removeAccount', this._id);
					Router.go('/home');
				}
			});
		}
	}
});