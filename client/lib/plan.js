if (Meteor.isClient) {

	var generateParticipantPool = function(plan, status) {
		var pool = plan.participants;
		var names = [];
		for (var i = 0; i < pool.length; i++) {
			var cur = pool[i];
			if (cur.status == status) {
				var user = Meteor.users.findOne(cur.userId);
				names.push(user.profile.firstname + ' ' + user.profile.lastname + ', ');
			}
		}
		names[names.length - 1] = names[names.length - 1].replace(', ', '');
		return names;
	}

	var generateCommentPool = function(plan) {
		var pool = plan.comments;
		var comments = [];
		for (var i = 0; i < pool.length; i++) {
			var curCommenter = Meteor.users.findOne(pool[i].createdBy);
			comments.push({
				planId: plan._id,
				createdBy: pool[i].createdBy,
				name: curCommenter.profile.firstname + ' ' + curCommenter.profile.lastname,
				text: pool[i].text
			});
		}
		return comments;
	}

	Template.plan.helpers({
		'organizer': function() {
			if (this.createdBy == Meteor.userId()) {
				return 'You';
			} else {
				var user = Meteor.users.findOne(this.createdBy);
				return user.profile.firstname + ' ' + user.profile.lastname;
			}
		},
		'isOwner': function() {
			return this.createdBy == Meteor.userId();
		},
		'goingUsers': function() {
			return generateParticipantPool(this, 'going');
		},
		'interestedUsers': function() {
			return generateParticipantPool(this, 'interested');
		},
		'comments': function() {
			return generateCommentPool(this);
		},
		'isCommentOwner': function() {
			return this.createdBy == Meteor.userId();
		},
		locationCoordinates: function() {

			var lat = this.location.latitude;
			var lng = this.location.longitude;
			if (GoogleMaps.loaded()) {
				return { // Singapore's position
					center: new google.maps.LatLng(lat, lng),
					zoom: 12
				};;
			}

		}
	});

	Template.plan.events({
		'click #settings': function(event) {
			event.preventDefault();
			Router.go('/plan/' + this._id + '/settings');
		},
		'click #add-comment': function(event) {
			event.preventDefault();
			var comment = $('#comment-input').val();
			Meteor.call('addComment', this, comment);
			$('#comment-input').val('');
		},
		'click #delete-comment': function(event) {
			event.preventDefault();
			if (confirm('Delete this comment?')) {
				var plan = Plans.findOne(this.planId);
				Meteor.call('deleteComment', plan, this);
			}
		}
	});

	hasSetMarker = false;

	Template.plan.onRendered(function() {
		$('.modal').on('shown.bs.modal', function () {
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
		});
	});


}