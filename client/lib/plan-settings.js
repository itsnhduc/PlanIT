Template.planSettings.events({
	'click #submit': function(event) {
		event.preventDefault();

		var title = $('#title').val();
		var location = $('#location').val();
		var description = $('#description').val();
		var visibility = $('[name=v-option]:checked').val();

		var planId = this._id;

		searchGoogleMaps(location, function(mapLocation) {
			var wrap = {
				title: title,
				description: description,
				location: {
					name: location,
					latitude: mapLocation.lat,
					longitude: mapLocation.lng
				},
				visibility: visibility,
				createdBy: Meteor.userId()
			};
			Meteor.call('updatePlan', planId, wrap, function(err) {
				if (err) {
					throw new Meteor.Error(err);
				} else {
					resetMarker();
					Router.go('/plan/' + planId);
				}	
			});
		});

		
	},
	'click #delete': function(event) {
		event.preventDefault();
		if (confirm('Are you sure you want to delete this plan?')) {
			Meteor.call('deletePlan', this._id);
			Router.go('/');
		}
	}
});

Template.planSettings.onRendered(function() {
	var visibility = this.data.visibility;
	$('#v-' + visibility).attr('checked', 'checked');
});