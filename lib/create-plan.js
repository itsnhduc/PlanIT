if (Meteor.isClient) {

	Template.createPlan.events({
		'click #submit': function(event) {
			event.preventDefault();

			var title = $('#title').val();
			var description = $('#description').val();
			var visibility = $('[name=v-option]:checked').val();

			Plans.insert({
				title: title,
				description: description,
				visibility: visibility,
				createdAt: new Date(),
				createdBy: Meteor.userId()
			});
			
			Router.go('/');
		}
	});

}