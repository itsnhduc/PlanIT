getNewsfeedPlans = function() {
	return Plans.find({$or: [{
		visibility: 'public' // public plan
	}, {
		createdBy: Meteor.userId() // own plan
	}, {
		visibility: 'friends',
		createdBy: {$in: getFriendsIds()}
	}, {
		'participants.userId': Meteor.userId() // plans in which user is a participant
	}]});
}