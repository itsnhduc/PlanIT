submitPlan = function() {
	var title = $('#title').val();
	var description = $('#description').val();
	var location = $('#location').val();
	var visibility = $('[name=v-option]:checked').val();

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
			participants: [],
			comments: [],
			createdAt: new Date(),
			createdBy: Meteor.userId()
		};

		Meteor.call('addPlan', wrap, function(err) {
			if (err) {
				throw new Meteor.Error(err);
			} else {
				Router.go('/');
			}
		});
		
	});
}