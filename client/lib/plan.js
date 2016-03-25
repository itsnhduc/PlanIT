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
			Plans.update(this._id, {$addToSet: {
				comments: {
					createdBy: Meteor.userId(),
					text: comment
				}
			}});
			$('#comment-input').val('');
		},
		'click #delete-comment': function(event) {
			event.preventDefault();
			if (confirm('Delete this comment?')) {
				Plans.update(this.planId, {$pull: {
					comments: {
						createdBy: this.createdBy,
						text: this.text
					}
				}});
			}
		}
	});

}