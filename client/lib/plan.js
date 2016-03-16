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
		}
	});

	Template.plan.events({
		'click #settings': function(event) {
			event.preventDefault();
			Router.go('/plan/' + this._id + '/settings');
		}
	});

}