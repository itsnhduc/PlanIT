var generateParticipantPool = function(plan, status) {
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

var generateCommentPool = function(plan) {
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

Template.plan.helpers({
	'organizer': function() {
		if (this.createdBy == Meteor.userId()) {
			return 'You';
		} else {
			var user = Meteor.users.findOne(this.createdBy);
			return getFullName(user);
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


Template.plan.onRendered(function() {
	$('.modal').on('shown.bs.modal', setMarker);
});