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


Manual deployment
-----------------

Because travis has bitrotten, in order to deploy the website manually:

```
git clone git@github.com:codicelieve/codicelieve.github.io.git
npm run build
rsync -av dist/ codicelieve.github.io/
```

then commit and push from `codicelieve.github.io`.
