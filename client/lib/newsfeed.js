Template.newsfeed.helpers({
	'plans': function() {
		return Plans.find({$or: [{
			visibility: 'public' // public plan
		}, {
			createdBy: Meteor.userId() // own plan
		}, {
			'participants.userId': Meteor.userId() // plans in which user is a participant
		}]});
	}
});