# dmnlint-pack-config

[![CI](https://github.com/bpmn-io/dmnlint-pack-config/workflows/CI/badge.svg)](https://github.com/bpmn-io/dmnlint-pack-config/actions?query=workflow%3ACI)

Pack a [dmnlint](https://github.com/bpmn-io/dmnlint) configuration as a consumable bundle.


## Usage

Pack a configuration using the `dmnlint-pack-config` executable:

```
npx dmnlint-pack-config -c .dmnlintrc -o packed-config.js -t es
```

Consume the packed config as part of your web-modeler:

```javascript
import { Linter } from 'dmnlint';

import linterConfig from './packed-config';

var linter = new Linter(linterConfig);

const results = await linter.lint(modelRoot);
```


## License

MIT
