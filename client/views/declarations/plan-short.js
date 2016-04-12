Template.planShort.helpers({
	'organizer': function() {
		console.log(this);
		return getOrganizer(this);
	},
	'visibilityIcon': function() {
		console.log(this);
		switch(this.visibility) {
			case 'public':
				return 'globe'
			case 'friends':
				return 'users'
			case 'private':
				return 'lock'
			default:
				return ''
		}
	}
});