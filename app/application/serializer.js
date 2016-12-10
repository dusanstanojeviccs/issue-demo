import DS from 'ember-data';

export default DS.RESTSerializer.extend({

	normalizeResponse: function(store, primaryModelClass, payload, id, requestType) {
		
		try {
			store.unloadAll(primaryModelClass.modelName);
		} catch(err) {}

		return this._super(store, primaryModelClass, payload, id, requestType);
	}

});