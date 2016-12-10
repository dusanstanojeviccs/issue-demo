import Ember from 'ember';

export default Ember.Component.extend({

	personChangeObserver: function() {
		console.log("Person was changed");
	}.observes("person.id")
});
