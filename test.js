const {expect} = require('chai');
const nunjucks = require('nunjucks');
const WithExtension = require('.');

const MockLoader = nunjucks.Loader.extend({
  getSource: function(name) {
    return {
      src: '{{ text }}',
      path: name
    };  
  }
});
const env = new nunjucks.Environment(new MockLoader());
env.addExtension('WithExtension', new WithExtension());

describe('with tag', function () {
  it('should isolate scope', function () {
    const tpl = `{% with {} %}{{ foo }}{% endwith %}`;
    expect(env.renderString(tpl, {foo: 'bar'})).to.equal('');
  });
  it('should set the scope to the provided variable', function () {
    const tpl = `{% with child %}{{ text }}{% endwith %}`;
    expect(env.renderString(tpl, {child: {text: 'child'}})).to.equal('child');
  });
  it('accepts dynamically provided objects', function () {
    const tpl = `{% with {text: 'child'} %}{{ text }}{% endwith %}`;
    expect(env.renderString(tpl, {text: 'parent'})).to.equal('child');
  });
  it('works as expected with includes', function () {
    const tpl = `{% with child %}{% include 'child.tpl' %}{% endwith %}`;
    expect(env.renderString(tpl, {text: 'parent', child: {text: 'child'}})).to.equal('child');
  });
});

