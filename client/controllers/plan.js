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
	Meteor.call('addComment', plan, comment);
	$('#comment-input').val('');
}

deleteComment = function(comment) {
	if (confirm('Delete this comment?')) {
		var plan = Plans.findOne(comment.planId);
		Meteor.call('deleteComment', plan, comment);
	}
}