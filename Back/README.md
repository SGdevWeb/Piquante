# Piiquante

Piiquante se dédie à la création de sauces épicées dont les recettes sont gardées secrètes. Pour tirer parti de son succès et générer davantage de buzz, l'entreprise souhaite créer une application web dans laquelle les utilisateurs peuvent ajouter leurs sauces préférées et liker ou disliker les sauces ajoutées par les autres.

## Spécifications de l'API

### Signup

```http
  POST /api/auth/signup
```

| request body                            | type de réponse                  |                 
| :-------------------------------------- | :------------------------------- |
| { email: `string`, password: `string` } |  { message: `string` }           |

#### Description                                                       

Hachage du mot de passe de l'utilisateur, ajout de l'utilisateur
à la base de données.   

### Login

```http
  POST /api/auth/login
```

| request body                            | type de réponse                         |                 
| :-------------------------------------- | :-------------------------------------- |
| { email: `string`, password: `string` } |  { userId: `string`, token: `string` }  |

#### Description                                                       

Vérification des informations d'identification de l'utilisateur, renvoie l _id de 
l'utilisateur depuis la base de données et un token web JSON signé (contenant 
également l'_id de l'utilisateur). 

### Get all sauces

```http
  GET /api/sauces
```

| request body                            | type de réponse                     |                 
| :-------------------------------------- | :---------------------------------- |
|                  -                      |  Array of sauces                    |

#### Description                                                       

Renvoie un tableau de toutes les sauces de la base de données.

### Get one sauces

```http
  GET /api/sauces/:id
```

| request body                            | type de réponse                     |                 
| :-------------------------------------- | :---------------------------------- |
|                  -                      |  Single sauce                       |

#### Description                                                       

Renvoie la sauce avec l’_id fourni.

### Create new sauce

```http
  POST /api/sauces/
```

| request body                            | type de réponse                     |                 
| :-------------------------------------- | :---------------------------------- |
| { sauce: `string`, image: `File` }          |  { message: `string` }                |

#### Description                                                       

Capture et enregistre l'image, analyse la sauce transformée en chaîne de caractères 
et l'enregistre dans la base de données en définissant correctement son imageUrl. 
Initialise les likes et dislikes de la sauce à 0 et les usersLiked et usersDisliked 
avec des tableaux vides. Remarquez que le corps de la demande initiale est vide ; 
lorsque multer est ajouté, il renvoie une chaîne pour le corps de la demande en 
fonction des données soumises avec le fichier.

### Modify sauce

```http
  PUT /api/sauces/:id
```

| request body                            | type de réponse                     |                 
| :-------------------------------------- | :---------------------------------- |
| { sauce: `string`, image: `File` }      |  { message: `string` }              |

#### Description                                                       

Met à jour la sauce avec l'_id fourni. Si une image est téléchargée, elle est capturée 
et l’imageUrl de la sauce est mise à jour. Si aucun fichier n'est fourni, les 
informations sur la sauce se trouvent directement dans le corps de la requête 
(req.body.name, req.body.heat, etc.). Si un fichier est fourni, la sauce transformée 
en chaîne de caractères se trouve dans req.body.sauce. Notez que le corps de la demande 
initiale est vide ; lorsque multer est ajouté, il renvoie une chaîne du corps de la 
demande basée sur les données soumises avec le fichier.

### Delete sauce

```http
  DELETE /api/sauces/:id
```

| request body                            | type de réponse                     |                 
| :-------------------------------------- | :---------------------------------- |
| -                                       |  { message: `string` }                |

#### Description                                                       

Supprime la sauce avec l'_id fourni.

### Delete sauce

```http
  POST /api/sauces/:id/like
```

| request body                            | type de réponse                     |                 
| :-------------------------------------- | :---------------------------------- |
| { userId: `string`, like: `Number` }    |  { message: `string` }              |

#### Description                                                      

Définit le statut « Like » pour l' userId fourni. Si like = 1, l'utilisateur aime 
(= like) la sauce. Si like = 0, l'utilisateur annule son like ou son dislike. Si 
like = -1, l'utilisateur n'aime pas (= dislike) la sauce. L'ID de l'utilisateur 
doit être ajouté ou retiré du tableau approprié. Cela permet de garder une trace 
de leurs préférences et les empêche de liker ou de ne pas disliker la même sauce 
plusieurs fois : un utilisateur ne peut avoir qu'une seule valeur pour chaque sauce. 
Le nombre total de « Like » et de « Dislike » est mis à jour à chaque nouvelle notation.
