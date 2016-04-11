Template.createPlan.events({
	'click #submit': function(event) {
		event.preventDefault();
		submitPlan();
	}
});

Template.createPlan.onRendered(function() {
	$('#datetime').datetimepicker();
});