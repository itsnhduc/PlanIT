changeStatus = function(newStatus, plan) {
	Meteor.call('indicateStatus', plan._id, Meteor.userId(), newStatus);
}

getStatusColor = function(status, participants) {
	var userId = Meteor.userId();
	for (var i = 0; i < participants.length; i++) {
		var user = participants[i];
		if (user.userId == userId && user.status == status) {
			return 'primary';
		}
	}
	return 'default';
}