editPlan = function(plan) {
	var title = $('#title').val();
	var location = $('#location').val();
	var description = $('#description').val();
	var visibility = $('[name=v-option]:checked').val();

	var planId = plan._id;

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
}

deletePlan = function(plan) {
	if (confirm('Are you sure you want to delete this plan?')) {
		Meteor.call('deletePlan', plan._id);
		Router.go('/');
	}
}

initVisibility = function(template) {
	var visibility = template.data.visibility;
	$('#v-' + visibility).attr('checked', 'checked');
}