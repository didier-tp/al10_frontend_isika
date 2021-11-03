cypress est une technologie javascript un peu plus moderne que selenium
permettant de déclencher des tests "end-to-end"
Principale différence entre cypress et selenium :
   * Selenium fonctionne au dehors d'un navigateur , les ordres sont donnés au 
     navigateur via l'intermédiaire d'un WebDriver
   * Cypress fonctionne directement en javascript dans un navigateur
     il est donc beaucoup plus rapide et peut beaucoup plus facilement interagir
     avec l'arbre DOM et xhr/ajax .

Selenium a cependant été utilisé massivement depuis 15ans par un très grand nombre
de testeurs. Selenium reste une REFERENCE incontournable.

The Cypress Test Runner is an open-source, downloadable application that runs your tests in a browser. 
It is free to use and is provided under the MIT licence
=====
npm install cypress --save-dev
Attention: de longues minutes de téléchargement à prévoir ....
=====
npm install -g npx
pour lancer 
npx cypress open
(plus court que 
./node_modules/.bin/cypress open
)
=====

premier lancement de cypress:
npx cypress open

=====
Exemple de test:
cypress/integration/myTest.spec.js

====
Lancement de l'application à tester :
npm install -g lite-server
lancer lite-server dans le répertoire contenant index.html
===
Lancement d'un test
npx cypress run --spec "cypress/integration/myTest.spec.js" --browser chrome > test_report.txt 




