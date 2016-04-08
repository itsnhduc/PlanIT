logout = function() {
	Meteor.logout(function(err) {
		if (err) {
			throw new Meteor.Error('Logout failed');
		} else {
			Router.go('/home');
		}
	});
}