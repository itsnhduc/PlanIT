if (Meteor.isClient) {

	Template.createPlan.events({
		'click #submit': function(event) {
			event.preventDefault();

			var title = $('#title').val();
			var description = $('#description').val();
			var location = $('#location').val();
			var visibility = $('[name=v-option]:checked').val();

			searchGoogleMaps(location, function(mapLocation) {
				Plans.insert({
					title: title,
					description: description,
					location: {
						name: location,
						latitude: mapLocation.lat,
						longitude: mapLocation.lng
					},
					visibility: visibility,
					participants: [],
					comments: [],
					createdAt: new Date(),
					createdBy: Meteor.userId()
				});
				
				Router.go('/');
			});	
		}
	});

}