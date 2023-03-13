# Bienvenue dans ce projet passionnant de codage d'un scroll infini !

Le scroll infini est un élément de conception web très courant, et dans ce projet, j'ai appris comment le coder. J'ai utilisé l'API de la banque d'images Unsplash pour intégrer un système de recherche et de scroll infini.

J'ai commencé par implémenter une interface utilisateur de base, contenant les éléments essentiels tels que des boutons, des entrées utilisateur et des liens. 

Une fois l'interface mise en place, je le suis concentrer sur la mise en place des fonctionnalités JavaScript du projet. Tout d'abord, il faut appeler l'API pour récupérer les images d'Unsplash. Pour ce faire j'ai utilisé la méthode FETCH dans un fonction asychrone.

Ensuite, une fois les données récupérées au format json, j'ai ajouté une fonction qui va créer une image pour chaques éléments reçu de l'API. Il ne reste plus qu'a gérer la mise en page.

Et maintenant le vif du sujet, la création du scroll infini: 

J'ai crée une constante qui va observer quand la barre de scroll de l'utilisateur arrivera légèrement avant le bas de l'écran. Une fois cette constante observée, il ne reste plus qu'a rapeller l'API pour envoyer à nouveau une sélection d'images, qui s'affichera à la suite des autres, et ce tant qu'il y a des images à afficher dans la base de données.

Un petit code pas bien compliqué mais il fallait y penser none?

Prêt à plonger dans le scroll infini ? Alors, allons-y !

