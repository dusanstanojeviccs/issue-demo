import DS from 'ember-data';

export default DS.RESTAdapter.extend({
	store: Ember.inject.service(),

	query(modelName, query, params) {
		return {persons:[{id:1, name:"Max"}, {id:2, name:"Dusan"}, {id:3, name:"Will"}, {id:4, name:"Matt"}]};
  	}
});
