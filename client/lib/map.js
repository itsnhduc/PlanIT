var hasSetMarker = false;

loadMap = function(location) {
	if (GoogleMaps.loaded()) {
		return { // Singapore's position
			center: new google.maps.LatLng(location.latitude, location.longitude),
			zoom: 12
		};;
	}
}

resetMarker = function() {
	hasSetMarker = false;
}

setMarker = function () {
	if (hasSetMarker == false) {
		hasSetMarker = true;
		var mapInstance = GoogleMaps.maps.map.instance;
		var center = mapInstance.getCenter();
		google.maps.event.trigger(mapInstance, 'resize');
		GoogleMaps.maps.map.instance.setCenter(center);
		var marker = new google.maps.Marker({
			position: center,
			map: mapInstance
		});
		marker.addListener('click', function() {
			mapInstance.setZoom(15);
			mapInstance.setCenter(marker.getPosition());
		});
	}
}

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