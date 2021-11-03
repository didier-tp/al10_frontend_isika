npx cypress run --spec "cypress/integration/myTest.spec.js" --browser chrome > test_report.txt 
REM option --headless pour ne pas montrer le navigateur sous controle
REM si pas option --browser chrome alors navigateur electron par defaut
REM placer "video" : false dans cypress.json pour desactiver l'enregistrement video
