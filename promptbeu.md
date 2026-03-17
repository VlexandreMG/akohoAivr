1 - Je t'explique le sujet , nous avons plein de lot de poulet , et le but c'est qu'avec une date données , le programme doit montrer , par lot , le nombre de poulet , le prix d'achat , le prix de la nourriture depensé par les poulets , le nombre de poulet mort , le poids moyen du lot , le prix de vente du lot , le nombre d'oeuf , la valeur via le nombre d'oeuf et le bénéfice . Avant de commencer , à coder , j'avais penser à mettre tous ça en une classe avec une table dans la base qui a juste des getters et setters , et chaque modèle correspondant auront une fonction qui permettront d'ajouter les résultat attendus. Ne donne pas encore de code , dis moi juste si l'idée est bonne ? Si oui donne moi la classe et le script de la base. 

2 - Alors , j'ai effacer le fichier frontend , pour repartir à 0 au niveau du front mais cette fois_ci avec bootstrap pour assurer le design. Peut tu me redonner les commandes stp . (on garde toujours le style atomic design + architecture angular).

3 - À partir de maintenant , on va faire les fonctions métiers correspondant à chaque tableau du bilan , mon idée c'est de faire la fonction dans le service ou repository en question (cela dépend du cas). Et dans le service de Bilanlot , on appel juste la fonction , et c'est ce service qui va être appelé au front. Dis moi si c'est une bonne idée. 

4 - Nombre de poulets : Une fonction dans AkohoMatyRepository qui regarde si la date de deces est inférieur à la date donnée. Si oui , il doit faire retourner la difference entre le nombre de poulet initiale et le nombre de akohoMaty. Si non , il retourne le nombre de poulet initiale. 
Puis , on appelle cette fonction dans BilanLotService.

5 - Prix Achat : Directement dans la base.

6 - Nombre de poulets morts : Une fonction dans AkohoMatyRepository qui fait le get le nombre de akoho maty si la date est inférieur à la date donnée. Après on appelle cette fonction dans BilanLotService.

7 - Poids moyen : Je vais te montrer un exemple de ce qu'il faut faire . Par exemple , la date donnée , c'est 12/03/26 , c'est à dire le 12 ème jour du mois de Mars , c'est à dire dans la 2ème semaine , sachant que la première semaine , le poulet a pris 400g , dans la deuxième semaine , la semaine concerné , il y a un règle de trois , si 7 jours est égale à 250g alors 5 jours donne (5 * 250)/7. Alors , le poids moyen est 400 + le resultat du règle de trois.

8 - Sakafo : L'argent dépensé à cause de l'alimentation du lot. On prend le poids moyen par rapport à la date donnée et on le multiplie avec le prixSakafo.
**Cumulé sa tsia le sakafo**

9 - Prix de vente : Le poids moyen multiplié par le nombre de poulets dans le tableau multiplié par prix_akoho_g.

10 - Nombre atody : En utilisant EtatAtody , par exemple nous avons, 12 comme nombre , 01/03/26 comme date de recensement , le date d'eclosion de ces oeufs se fera AUTOMATIQUEMENT +30j + 1j après la date de recensement , après les 31 j , on aura un nouveau lot avec comme date , le date+31 et comme nombre = le nombre de EtatAtody - (nombre de EtatAtody * percentLamokana (depend de la race)). Et si la date donnée est entre le date de recensement et le date+31j , alors , on retourne le nombre atody dans EtatAtody.

11 - Valeur de atody  : Le nombre atody * prix_atody unitaire dans prix_vente.

12 - Benefice : (Prix de vente + valeur atody) - (Prix achat + sakafo). 