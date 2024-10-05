
[Project: HashMap] (https://www.theodinproject.com/lessons/javascript-hashmap)


I've been very lost trying to diagnose an issue with being able to import a Linked List package that I published earlier. It could be an npm/webpack build issue.

### What could be causing the error below to happen?

#### 	Error message: 
```
ERROR in ./src/index.js 8:25-33
export 'testFunc' (imported as 'testFunc') was not found in '@thereisnodeveloper/linked-list' (module has no exports)

webpack 5.94.0 compiled with 1 error in 37 ms
```

#### Source code:
https://github.com/thereisnodeveloper/linked-list
#### NPM package:
https://www.npmjs.com/package/@thereisnodeveloper/linked-list

#### Export statement in Linked List
`export { testFunc, linkedList };`

#### Import statement in Hash Map
`import {testFunc} from '@thereisnodeveloper/linked-list';`


**What i've tried:**
 - ensure package is installed with npm install
- use `npm link` to test (fails
- use global console.log() to see if the package loads at all (it does, just doesn't seem to be exporting anything)
- for Webpack config, switch from .cjs to .js (and use `import` instead of `require()`)
- try explicitly setting `"main": "dist/main.js",  "module": "dist/main.js",`
- default and named export formats

#### Where I guess problems could lie:
 - how I'm using/not using Babel
 - when I build my project and look at the output `main.js`, i get the following. Which makes me think something's wrong with the build. 
	```
	(()=>{"use strict";console.log("Linked List package loaded - test!!!")})();
	//# sourceMappingURL=main.js.map
	```


