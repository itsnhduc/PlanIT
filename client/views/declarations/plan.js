Template.plan.helpers({
	'organizer': function() {
		return getOrganizer(this);
	},
	'isOwner': function() {
		return isOwner(this);
	},
	'goingUsers': function() {
		return getParticipants(this, 'going');
	},
	'interestedUsers': function() {
		return getParticipants(this, 'interested');
	},
	'comments': function() {
		return getComments(this);
	},
	'isCommentOwner': function() {
		return isCommentOwner(this);
	},
	'locationCoordinates': function() {
		return loadMap(this.location);
	}
});

Template.plan.events({
	'click #settings': function(event) {
		event.preventDefault();
		Router.go('/plan/' + this._id + '/settings');
	},
	'click #add-comment': function(event) {
		event.preventDefault();
		addComment(this);
	},
	'click #delete-comment': function(event) {
		event.preventDefault();
		deleteComment(this);
	},
	'click #invite-btn': function(event) {
		event.preventDefault();
		Router.go('/plan/' + this._id + '/invite');
	}
});


Template.plan.onRendered(function() {
	$('.modal').on('shown.bs.modal', setMarker);
});