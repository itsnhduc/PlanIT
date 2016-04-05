if (Meteor.isClient) {

	searchGoogleMaps = function(query, callback) {
		var modifiedQuery = '';
		for (var i = 0; i < query.length; i++) {
			if (query[i] == ' ') {
				modifiedQuery += '+';
			} else {
				modifiedQuery += query[i];
			}
		}
		var path = 'https://maps.googleapis.com/maps/api/geocode/json?address='
					+ modifiedQuery
					+ '&components=country:SG';
		$.getJSON(path, function(data) {
			var location = data.results[0].geometry.location; // first result
			callback(location);
		});
	}

	Meteor.startup(function() {	
		GoogleMaps.load();
	});
	
}