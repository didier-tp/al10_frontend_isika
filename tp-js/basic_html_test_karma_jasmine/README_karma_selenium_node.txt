karma est une technologie javascript (s'appyant sur nodeJs) qui 
permet de lancer un navigateur de façon à tester le comportement
de certains elements HTML/JS s'exécutant au sein d'un navigateur.
=====
npm install jasmine-core karma karma-chrome-launcher karma-jasmine karma-jasmine-html-reporter karma-spec-reporter --save-dev
=====
karma s'appuie sur nodeJs.
Un navigateur ordinaire ne comprend par par défaut l'instruction require() de nodeJs .
Il est souvent nécessaire (juste pour les tests) , d'ajouter la technologie "browserify"
permetant d'executer require("...") dans un navigateur. 
watchify = dépendance indirecte , nécessaire.
=====
npm install --save-dev karma-browserify browserify watchify
=====
install de karma en mode global:
npm install -g karma

lancement de karma:
karma start


NB: karma et selenium sont utilisés en interne 
par la partie "protractor" d'angular