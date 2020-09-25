Codice Lieve homepage
=====================

This is the source code of the website served at https://codice.lieve.info/


Development
-----------

Run:

```
npm install
npm start
```

and open http://localhost:8080/


Deployment
----------

Travis CI will
[![build](https://travis-ci.org/codicelieve/codice.lieve.info.svg?branch=master)](https://travis-ci.org/codicelieve/codice.lieve.info)
the code and and deploy automatically the `release` branch by pushing to the
reps at https://github.com/codicelieve/codicelieve.github.io/.

In order to build the website manually you can run:

```
npm run build
```

Built artifacts will be in the `./dist` directory.
