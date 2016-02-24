if (Meteor.isClient) {

	Template.planSettings.events({
		'click #submit': function(event) {
			event.preventDefault();

			var title = $('#title').val();
			var description = $('#description').val();
			var visibility = $('[name=v-option]:checked').val();

			Plans.update(this._id, {
				title: title,
				description: description,
				visibility: visibility,
				createdAt: new Date()
			});
			
			Router.go('/plan/' + this._id);
		},
		'click #delete': function(event) {
			event.preventDefault();
			if (confirm('Are you sure you want to delete this plan?')) {
				Plans.remove(this._id);
			}
			Router.go('/');
		}
	});

	Template.planSettings.onRendered(function() {
		var visibility = this.data.visibility;
		$('#v-' + visibility).attr('checked', 'checked');
	});

}