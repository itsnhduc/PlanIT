getEmailAddress = function(plan) {
	return plan.emails[0].address;
}

editProfile = function(user) {
	var firstname = $('#firstname').val();
	var lastname = $('#lastname').val();
	var email = $('#email').val();

	var wrap = {
		emails: [{address: email, verified: false}],
		profile: {
			firstname: firstname,
			lastname: lastname
		}
	};

	Meteor.call('updateProfile', wrap);

	var passwordOld = $('#password-old').val();
	var passwordNew = $('#password-new').val();

	if (passwordOld != '' && passwordNew != '') {
		Accounts.changePassword(passwordOld, passwordNew);
	}

	Router.go('/user/' + user._id);
}

deleteAccount = function(user) {
	if (confirm('Are you sure you want to delete your account?')) {
		Meteor.logout(function(err) {
			if (err) {
				throw new Meteor.Error('Logout failed.');
			} else {
				Meteor.call('removeAccount', user._id);
				Router.go('/home');
			}
		});
	}
}