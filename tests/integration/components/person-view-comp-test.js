import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('person-view-comp', 'Integration | Component | person view comp', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{person-view-comp}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#person-view-comp}}
      template block text
    {{/person-view-comp}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
