// >>>>>>>> Plan Info <<<<<<<<
getOrganizer = function(plan) {
	if (plan.createdBy == Meteor.userId()) {
		return 'You';
	} else {
		var user = Meteor.users.findOne(plan.createdBy);
		return getFullName(user);
	}
}

getParticipants = function(plan, status) {
	var pool = plan.participants;
	var names = [];
	for (var i = 0; i < pool.length; i++) {
		var cur = pool[i];
		if (cur.status == status) {
			var user = Meteor.users.findOne(cur.userId);
			names.push(getFullName(user) + ', ');
		}
	}
	names[names.length - 1] = names[names.length - 1].replace(', ', '');
	return names;
}

getComments = function(plan) {
	var pool = plan.comments;
	var comments = [];
	for (var i = 0; i < pool.length; i++) {
		var curCommenter = Meteor.users.findOne(pool[i].createdBy);
		comments.push({
			planId: plan._id,
			createdBy: pool[i].createdBy,
			name: getFullName(curCommenter),
			text: pool[i].text
		});
	}
	return comments;
}

isOwner = function(plan) {
	return plan.createdBy == Meteor.userId();
}

isCommentOwner = function(comment) {
	return comment.createdBy == Meteor.userId();
}

addComment = function(plan) {
	var comment = $('#comment-input').val();
	if (comment != '') {
		Meteor.call('addComment', plan, comment);
		$('#comment-input').val('');
	}
}

deleteComment = function(comment) {
	if (confirm('Delete this comment?')) {
		var plan = Plans.findOne(comment.planId);
		Meteor.call('deleteComment', plan, comment);
	}
}

// >>>>>>>> Plan Settings <<<<<<<<
var checkPlanError = function(planData, method) {

	var blankError = false;
	$.each(planData, function(key, value) {
		if (value == '') {
			blankError = true;
		}
	});

	if (blankError) {
		$('#plan-error').text('You cannot leave any field blank.');
	} else {
		method();
	}

}

submitPlan = function() {
	var title = $('#title').val();
	var description = $('#description').val();
	var location = $('#location').val();
	var visibility = $('[name=v-option]:checked').val();

	checkPlanError([title, description, location, visibility], function() {
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
	});
	
}

editPlan = function(plan) {
	var title = $('#title').val();
	var location = $('#location').val();
	var description = $('#description').val();
	var visibility = $('[name=v-option]:checked').val();

	var planId = plan._id;

	checkPlanError([title, description, location, visibility], function() {
		searchGoogleMaps(location, function(mapLocation) {
			var wrap = {
				title: title,
				description: description,
				'location.name': location,
				'location.latitude': mapLocation.lat,
				'location.longitude': mapLocation.lng,
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
	})


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