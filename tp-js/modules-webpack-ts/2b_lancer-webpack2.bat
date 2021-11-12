REM ajuster le fichier webpack.config.js
REM avant de lancer webpack
webpack --config ./webpack.config2.js> statut-webpack.txt 2> webpack-error.txt
REM npm run webpack-watch

REM NB: webpack --config ./webpack-xyz.config.js si autre config que webpack.config.js