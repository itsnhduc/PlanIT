Router.route('/', {
	name: 'newsfeed',
	template: 'newsfeed'
});

Router.route('/create-plan');
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

Router.configure({
	layoutTemplate: 'master'
});