if (Meteor.isClient) {

	Template.planSettings.events({
		'click #submit': function(event) {
			event.preventDefault();

			var title = $('#title').val();
			var location = $('#location').val();
			var description = $('#description').val();
			var visibility = $('[name=v-option]:checked').val();

			var planId = this._id;

			searchGoogleMaps(location, function(mapLocation) {
				Plans.update(planId, {$set: {
					title: title,
					description: description,
					location: {
						name: location,
						latitude: mapLocation.lat,
						longitude: mapLocation.lng
					},
					visibility: visibility,
					createdBy: Meteor.userId()
				}});
				
				Router.go('/plan/' + planId);
			});

			hasSetMarker = false;
			
		},
		'click #delete': function(event) {
			event.preventDefault();
			if (confirm('Are you sure you want to delete this plan?')) {
				Plans.remove(this._id);
				Router.go('/');
			}
		}
	});

	Template.planSettings.onRendered(function() {
		var visibility = this.data.visibility;
		$('#v-' + visibility).attr('checked', 'checked');
	});

}