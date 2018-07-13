# RailRoadMockup Project

## Capture d'écran

![alt tag](https://cloud.githubusercontent.com/assets/14871637/22419074/0e3a660a-e6dc-11e6-861b-1672ccaaa487.png)

## Exécution
 
 1. Côté serveur

node.exe bin\www

2. Côté client

Compatible avec tous les navigateurs sauf Firefox (http://localhost:80).

## Explications

Structure du projet

  * bin/www

C'est le point d'entrée du serveur (défini dans 'package.json'). C'est ici qu'est créé un objet 'server' à chaque connexion d'un client en prenant en compte les paramètres du fichier 'app.js'.
C'est ici que seront gérés les événements liés au socket, c'est à dire les échanges bidirectionnels avec le client.

* app.js

C'est le descripteur de l'application (http://expressjs.com/fr/api.html), on définit ici le routage (avec **app.use()**, voir http://expressjs.com/fr/starter/basic-routing.html), et les variables globales de l'application (avec **app.set()**).
On initialise ici les objets métier (voir commentaire // Business Objects Collections), c'est à dire les objets liés au "monde réel" : les feux de signalisation, les aiguillages, etc...

* routes

Contient des fonctions dites middleware qui gèrent les requêtes et les réponses. Ca ressemble au Contrôleur dans un MVC classique.
On effectue un traitement et on renvoie une Vue. Ici on n'utilise pas les templates du répertoire views car on dessine directement en vectoriel dans un DOM virtuel.
La seule route qu'on utilise est "railroad.js" qui va créer des objets SVG côté serveur (node-raphael + jsdom) en lisant le fichier "data/mockup.json" et les envoyer à la fabrique pour les monter à la volée et les stocker dans une collection pour les manipuler.

* business

Contient tous les objets métier, "trafficlight.js" (feu de signalisation...), "scanner.js" (lecteur code barre), ...

* models

Contient les fonctions d'accès à la source de données, en l'occurrence l'arduino ("arduino.js" à implémenter).

* views

Système de template jade, on ne s'en servira pas.

* public/javascript

Contient les fonctions liées à la communication du socket, et les fonction propres du client (jQuery).
