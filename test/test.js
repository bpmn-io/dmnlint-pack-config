const {
  packConfig
} = require('../index');

const { expect } = require('chai');


describe('dmnlint-pack-config', function() {

  describe('packConfig', function() {

    it('should write cjs', async function() {

      // when
      const { code } = await packConfig('test/.dmnlintrc', 'cjs');

      // then
      // imports are resolved
      expect(code).not.to.contain('import rule_0');

      // rules are resolved
      expect(code).to.contain('"no-duplicate-requirements": "error"');
      expect(code).to.contain('cache[\'dmnlint/no-duplicate-requirements\'] = noDuplicateRequirements;');

      // exports are in place
      expect(code).to.contain('exports[\'default\'] = bundle;');
      expect(code).to.contain('exports.config = config;');
      expect(code).to.contain('exports.resolver = resolver;');
    });


    it('should write es', async function() {

      // when
      const { code } = await packConfig('test/.dmnlintrc', 'es');

      // then
      // imports are resolved
      expect(code).not.to.contain('import rule_0');

      // rules are resolved
      expect(code).to.contain('"no-duplicate-requirements": "error"');
      expect(code).to.contain('cache[\'dmnlint/no-duplicate-requirements\'] = noDuplicateRequirements;');

      // exports are in place
      expect(code).to.contain('export { config, bundle as default, resolver };');
    });


    it('should write UMD', async function() {

      // when
      const { code } = await packConfig('test/.dmnlintrc', 'umd', 'FOO');

      // then
      // imports are resolved
      expect(code).not.to.contain('import rule_0');

      // rules are resolved
      expect(code).to.contain('"no-duplicate-requirements": "error"');
      expect(code).to.contain('cache[\'dmnlint/no-duplicate-requirements\'] = noDuplicateRequirements;');

      // exports are in place
      expect(code).to.contain('exports[\'default\'] = bundle;');
      expect(code).to.contain('exports.config = config;');
      expect(code).to.contain('exports.resolver = resolver;');

      expect(code).to.contain('global.FOO = {}');
    });


    it('should pack custom named config', async function() {

      // when
      const { code } = await packConfig('test/other.json', 'esm');

      // then
      // imports are resolved
      expect(code).not.to.contain('import rule_0');

      // rules are resolved
      expect(code).to.contain('"no-duplicate-requirements": "error"');
      expect(code).to.contain('cache[\'dmnlint/no-duplicate-requirements\'] = noDuplicateRequirements;');
    });

  });

});