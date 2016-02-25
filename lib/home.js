if (Meteor.isClient) {

	Template.home.events({
		'click #login': function(event) {
			event.preventDefault();
			var email = $('#login-email').val();
			var password  =$('#login-password').val();
			Meteor.loginWithPassword(email, password, function(err) {
				if (err) {
					throw new Meteor.Error('Logout failed');
				}
			});
			Router.go('/');
		},
		'click #register': function(event) {
			event.preventDefault();
			var firstname = $('#reg-firstname').val();
			var lastname = $('#reg-lastname').val();
			var email = $('#reg-email').val();
			var password = $('#reg-password').val();
			
			Accounts.createUser({
				email: email,
				password: password,
				profile: {
					firstname: firstname,
					lastname: lastname
				}
			});
			Meteor.loginWithPassword(email, password, function(err) {
				if (err) {
					throw new Meteor.Error('Logout failed');
				}
			});
			Router.go('/');
		}
	});

}