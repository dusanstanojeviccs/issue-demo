"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('issue-demo/adapters/application', ['exports', 'ember-data'], function (exports, _emberData) {
	exports['default'] = _emberData['default'].RESTAdapter.extend({

		shouldReloadRecord: function shouldReloadRecord(store, snapshot) {
			return true;
		},

		shouldReloadAll: function shouldReloadAll(store, snapshot) {
			return true;
		},

		shouldBackgroundReloadRecord: function shouldBackgroundReloadRecord(store, snapshot) {
			return true;
		},

		shouldBackgroundReloadAll: function shouldBackgroundReloadAll(store, snapshot) {
			return true;
		}
	});
});
/*jshint unused:false*/
define("issue-demo/adapters/person", ["exports", "ember-data"], function (exports, _emberData) {
	exports["default"] = _emberData["default"].RESTAdapter.extend({
		store: Ember.inject.service(),

		query: function query(modelName, _query, params) {
			return { persons: [{ id: 1, name: "Max" }, { id: 2, name: "Dusan" }, { id: 3, name: "Will" }, { id: 4, name: "Matt" }] };
		}
	});
});
define('issue-demo/app', ['exports', 'ember', 'issue-demo/resolver', 'ember-load-initializers', 'issue-demo/config/environment'], function (exports, _ember, _issueDemoResolver, _emberLoadInitializers, _issueDemoConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _issueDemoConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _issueDemoConfigEnvironment['default'].podModulePrefix,
    Resolver: _issueDemoResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _issueDemoConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('issue-demo/application/serializer', ['exports', 'ember-data'], function (exports, _emberData) {
	exports['default'] = _emberData['default'].RESTSerializer.extend({

		normalizeResponse: function normalizeResponse(store, primaryModelClass, payload, id, requestType) {

			try {
				store.unloadAll(primaryModelClass.modelName);
			} catch (err) {}

			return this._super(store, primaryModelClass, payload, id, requestType);
		}

	});
});
define('issue-demo/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'issue-demo/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _issueDemoConfigEnvironment) {

  var name = _issueDemoConfigEnvironment['default'].APP.name;
  var version = _issueDemoConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define("issue-demo/components/person-view-comp", ["exports", "ember"], function (exports, _ember) {
	exports["default"] = _ember["default"].Component.extend({

		personChangeObserver: (function () {
			console.log("Person was changed");
		}).observes("person.id")
	});
});
define("issue-demo/controllers/random-route-two", ["exports", "ember"], function (exports, _ember) {
	exports["default"] = _ember["default"].Controller.extend({
		actions: {
			setPerson: function setPerson(person) {
				this.set("person", person);
			}
		}
	});
});
define("issue-demo/controllers/random-route", ["exports", "ember"], function (exports, _ember) {
	exports["default"] = _ember["default"].Controller.extend({
		actions: {
			setPerson: function setPerson(person) {
				this.set("person", person);
			}
		}
	});
});
define('issue-demo/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('issue-demo/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('issue-demo/helpers/t', ['exports', 'ember-i18n/helper'], function (exports, _emberI18nHelper) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberI18nHelper['default'];
    }
  });
});
define('issue-demo/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'issue-demo/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _issueDemoConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_issueDemoConfigEnvironment['default'].APP.name, _issueDemoConfigEnvironment['default'].APP.version)
  };
});
define('issue-demo/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('issue-demo/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('issue-demo/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.Controller.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('issue-demo/initializers/ember-i18n', ['exports', 'ember-i18n/initializers/ember-i18n'], function (exports, _emberI18nInitializersEmberI18n) {
  exports['default'] = _emberI18nInitializersEmberI18n['default'];
});
define('issue-demo/initializers/export-application-global', ['exports', 'ember', 'issue-demo/config/environment'], function (exports, _ember, _issueDemoConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_issueDemoConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _issueDemoConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_issueDemoConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('issue-demo/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('issue-demo/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('issue-demo/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define("issue-demo/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('issue-demo/instance-initializers/ember-i18n', ['exports', 'ember-i18n/instance-initializers/ember-i18n'], function (exports, _emberI18nInstanceInitializersEmberI18n) {
  exports['default'] = _emberI18nInstanceInitializersEmberI18n['default'];
});
define("issue-demo/models/person", ["exports", "ember-data"], function (exports, _emberData) {
	exports["default"] = _emberData["default"].Model.extend({
		name: _emberData["default"].attr("string")
	});
});
define('issue-demo/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('issue-demo/router', ['exports', 'ember', 'issue-demo/config/environment'], function (exports, _ember, _issueDemoConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _issueDemoConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('random-route');
    this.route('random-route-two');
  });

  exports['default'] = Router;
});
define("issue-demo/routes/random-route-two", ["exports", "ember"], function (exports, _ember) {
	exports["default"] = _ember["default"].Route.extend({
		model: function model() {
			return this.store.query("person", {});
		}
	});
});
define("issue-demo/routes/random-route", ["exports", "ember"], function (exports, _ember) {
	exports["default"] = _ember["default"].Route.extend({
		model: function model() {
			return this.store.query("person", {});
		}
	});
});
define('issue-demo/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define('issue-demo/services/i18n', ['exports', 'ember-i18n/services/i18n'], function (exports, _emberI18nServicesI18n) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberI18nServicesI18n['default'];
    }
  });
});
define("issue-demo/templates/components/person-view-comp", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Dzl9nSPL", "block": "{\"statements\":[[\"text\",\"Person view: \"],[\"append\",[\"unknown\",[\"person\",\"name\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "issue-demo/templates/components/person-view-comp.hbs" } });
});
define("issue-demo/templates/random-route-two", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "ugCQdxD3", "block": "{\"statements\":[[\"block\",[\"link-to\"],[\"random-route\"],null,1],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,0],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"person-view-comp\"],null,[[\"person\"],[[\"get\",[\"person\"]]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"span\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"p\",\"id\"]],false],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"setPerson\",[\"get\",[\"p\"]]]],[\"flush-element\"],[\"append\",[\"unknown\",[\"p\",\"name\"]],false],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"p\"]},{\"statements\":[[\"text\",\"\\tpage one\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "issue-demo/templates/random-route-two.hbs" } });
});
define("issue-demo/templates/random-route", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Y8KZ9a/5", "block": "{\"statements\":[[\"block\",[\"link-to\"],[\"random-route-two\"],null,1],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,0],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"person-view-comp\"],null,[[\"person\"],[[\"get\",[\"person\"]]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"span\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"p\",\"id\"]],false],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"setPerson\",[\"get\",[\"p\"]]]],[\"flush-element\"],[\"append\",[\"unknown\",[\"p\",\"name\"]],false],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"p\"]},{\"statements\":[[\"text\",\"\\tpage two\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "issue-demo/templates/random-route.hbs" } });
});
define('issue-demo/utils/i18n/compile-template', ['exports', 'ember-i18n/utils/i18n/compile-template'], function (exports, _emberI18nUtilsI18nCompileTemplate) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberI18nUtilsI18nCompileTemplate['default'];
    }
  });
});
define('issue-demo/utils/i18n/missing-message', ['exports', 'ember-i18n/utils/i18n/missing-message'], function (exports, _emberI18nUtilsI18nMissingMessage) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberI18nUtilsI18nMissingMessage['default'];
    }
  });
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('issue-demo/config/environment', ['ember'], function(Ember) {
  var prefix = 'issue-demo';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("issue-demo/app")["default"].create({"name":"issue-demo","version":"0.0.0+b9fbf1ee"});
}

/* jshint ignore:end */
//# sourceMappingURL=issue-demo.map
