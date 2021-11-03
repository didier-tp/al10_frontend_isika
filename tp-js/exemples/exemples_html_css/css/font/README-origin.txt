Sources de quelques fontes/polices spécifiques:
================================================

highlight :
https://www.dafont.com/fr/
https://www.dafont.com/fr/search.php?q=the_root

allura:
https://www.fontsquirrel.com/fonts/list/tag/elegant
https://www.fontsquirrel.com/fonts/download/allura
https://www.fontsquirrel.com/fonts/download/playfair-display

Génération de font (multi-formats):
=================================
https://www.fontsquirrel.com/tools/webfont-generator 
-------
https://www.fontsquirrel.com/tools/webfont-generator 
-------
1. choisir mode expert avec svg
2. updloader la font brute de départ
3. renommer stylesheet.css en xyz-webfont.css dans partie CSS/CSS file name
4. cocher "agreement"
5. Download kit
--> zip -->allura-regular-webfont... 


Utilisation d'une fonte personnalisée/spécifique:
======================
recopier dans le répertoire css/font 
les fichiers xyz-webfont.css , xyz-webfont.svg , xyz-webfont.woff , xyz-webfont.woff2

NB: le fichier xyz-webfont.css (avec ici xyz=alluraregular)
comporte la description suivante:
-------
@font-face {
    font-family: 'alluraregular';
    src: url('allura-regular-webfont.woff2') format('woff2'),
         url('allura-regular-webfont.woff') format('woff'),
         url('allura-regular-webfont.svg#alluraregular') format('svg');
    font-weight: normal;
    font-style: normal;

}
--------

Ce fichier xyz-webfont.css est généralement importé 
dans un autre css (tel que common.css):
@import 'font/xyz-webfont.css'
@import 'font/allura-webfont.css'


et enfin un fichier css tel que common.css va utiliser
la fonte spécifique (en faisant référence au font-family enregistré)
via un style css de ce type:
----------------
.withAlluraFont{
	font-family : alluraregular, Arial ;
	font-size : 2em;
}
----------------

