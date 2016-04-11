Template.planSettings.events({
	'click #submit': function(event) {
		event.preventDefault();
		editPlan(this);
	},
	'click #delete': function(event) {
		event.preventDefault();
		deletePlan(this);
	}
});

Template.planSettings.helpers({
	'datetime': function() {
		return convertDate(this);
	}
});

Template.planSettings.onRendered(function() {
	$('#datetime').datetimepicker();
	initVisibility(this);
});