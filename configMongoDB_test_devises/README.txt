le complement mongoimport.exe était installé d'office en version 3.2
et doit etre installé en plus en V4

Normalement on le récupère depuis la partie "DatabaseTools" de mongoDB
Aujourd'hui il faut recopier mongoimport.exe du referentiel git vers
le répertoire C:\Program Files\MongoDB\Server\4.4\bin

Ensuite on peut lancer le script import_...bat

---------------
Depuis la v4 , mongoimport n'est plus installépar défaut
mais l'interface graphique mongoCompass est maintenant installée par défaut.

URL base locale:
mongodb://superuser:motdepasse@localhost:27017
mongodb://localhost:27017
mongodb://localhost:27017/test
mongodb://localhost:27017/test?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false

URL base distante (hébergée par Atlas):
mongodb+srv://dbAdmin:MYPWD%21@cluster0.a570g.mongodb.net/test
mongodb+srv://dbAdmin:MYPWD%21@cluster0.a570g.mongodb.net/test?authSource=admin&replicaSet=atlas-w5jool-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true

ou MYPWD est a remplacer par dba... ou ...007 ou ...... selon le mot de passe choisi .
et dbAdmin=username et cluster0.a570g.mongodb.net = cluster mongoDB hébergé par Atlas
et test=database name
