import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		setPerson(person) {
			this.set("person", person);
		}
	}
});
