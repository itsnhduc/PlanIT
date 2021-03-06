Router.route('/', {
	name: 'newsfeed',
	template: 'newsfeed',
});

Router.route('/home');

Router.route('/plan/:_id', {
	template: 'plan',
	data: function() {
		return Plans.findOne(this.params._id);
	}
});
Router.route('/plan/:_id/settings', {
	template: 'planSettings',
	data: function() {
		return Plans.findOne(this.params._id);
	}
});
Router.route('/plan/:_id/invite', {
	template: 'invite',
	data: function() {
		return Plans.findOne(this.params._id);
	}
});

Router.route('/user/:_id', {
	template: 'profile',
	data: function() {
		return Meteor.users.findOne(this.params._id);
	}
});
Router.route('/user/:_id/settings', {
	template: 'profileSettings',
	data: function() {
		return Meteor.users.findOne(this.params._id);
	}
});

Router.configure({
	layoutTemplate: 'master'
});

Router.onBeforeAction(function() {
	if (Meteor.userId()) {
		this.next();
	} else {
		this.render('home');
	}
}, {except: ['home']});

Router.onBeforeAction(function() {
	if (!Meteor.userId()) {
		this.next();
	} else {
		this.render('newsfeed');
	}
}, {only: ['home']});