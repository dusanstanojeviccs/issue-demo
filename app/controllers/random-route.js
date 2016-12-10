import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		setPerson(person) {
			this.set("person", person);
		}
	}
});
