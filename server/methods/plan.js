if (Meteor.isServer) {
	Meteor.methods({
		'addPlan': function(wrap) {
			Plans.insert(wrap);
		},
		'updatePlan': function(planId, wrap) {
			Plans.update(planId, {$set: wrap});
		},
		'deletePlan': function(planId) {
			Plans.remove(planId);
		}
	});
}