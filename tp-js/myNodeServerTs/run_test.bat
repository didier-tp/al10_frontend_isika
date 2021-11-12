REM lancement (via npm run test ou npm test)
REM de la partie 
REM  "scripts": {  "test": "./node_modules/.bin/mocha dist/test --reporter spec"  }
REM de package.json
npm test > mocha_report.txt 2> err.txt