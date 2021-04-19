import firebase from 'src/utils/firebaseConfig';
import 'firebase/firestore';

const db = firebase.firestore();

const firestoreService = () => {
  const addRepo = (user, repo) => {
    const docRef = db
      .collection('users').doc(user.uid)
      .collection('repos').doc(repo.node_id);
    console.log(repo);
    docRef
      .set({
        name: repo.name,
        description: repo.description,
        owner: {
          login: repo.owner.login,
          avatar_url: repo.owner.avatar_url,
        },
        html_url: repo.html_url,
      })
      .then(() => {
        console.log('Ajout du repo avec succès !');
      })
      .catch((error) => {
        console.error(`Erreur d'ajout du repo :  ${error}`);
      });
  };

  const removeFavorite = (user, repo) => {
    db
      .collection('users').doc(user.uid)
      .collection('repos').doc(repo.node_id)
      .delete()
      .then(() => {
        console.log('Repo supprimé des favoris !');
      })
      .catch((error) => {
        console.error(`Erreur de suppression du repo des favoris :  ${error}`);
      });
  };

  const addUser = (user, repo) => {
    const userRef = db.collection('users');
    userRef.doc(user.uid).set({
      name: user.displayName,
      email: user.email,
      photoUrl: user.photoURL,
    })
      .then(() => {
        console.log('Utilisateur créé.');
        addRepo(user, repo);
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error(`Erreur de création de l'utilisateur : ${error}`);
      });
  };

  const updateUser = (user, repo) => {
    const userRef = db.collection('users').doc(user.uid);
    return userRef.update({
      name: user.displayName,
      email: user.email,
      photoUrl: user.photoURL,
    })
      .then(() => {
        console.log('Utilisateur mis à jour.');
        addRepo(user, repo);
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error(`Erreur de mise à jour de l'utilisateur : ${error}`);
      });
  };

  // check if user is already in register
  // then update with data frome google acc ? to refacto if it is not a google account
  // next add the current repo to user favorites
  const addFavorite = (user, repo) => {
    const docRef = db.collection('users').doc(user.uid);
    docRef.get()
      .then((doc) => {
        if (doc.exists) {
          console.log('Utilisateur existant:', doc.data());
          updateUser(user, repo);
        }
        else {
          // doc.data() will be undefined in this case
          console.log('L\'utilisateur n\'existe pas !');
          addUser(user, repo);
        }
      }).catch((error) => {
        console.log(`Erreur de vérification de l'utilisateur : ${error}`);
      });
  };

  // return bool saying if the repo is a favorite
  const isStar = (user, repo, setIsStar) => {
    const docRef = db
      .collection('users').doc(user.uid)
      .collection('repos').doc(repo.node_id);

    docRef.get().then((doc) => {
      if (doc.exists) {
        console.log(`Document data: ${doc.data()}`);
        setIsStar(true);
      }
      else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    }).catch((error) => {
      console.log(`Error getting document: ${error}`);
    });
  };

  const getFavoritesRepos = (user, favoritesRepos) => {
    console.log('enter get fav repos');
    console.log(user.email);
    const docRef = db
      .collection('users').doc(user.uid)
      .collection('repos');

    docRef
      .get()
      .then((querySnapshot) => {
        let repos = [];
        querySnapshot.forEach((doc) => {
          const repo = doc.data();
          repos = [...repos, {
            node_id: doc.id,
            name: repo.name,
            description: repo.description,
            owner: {
              login: repo.owner.login,
              avatar_url: repo.owner.avatar_url,
            },
            html_url: repo.html_url,
          }];
        });
        favoritesRepos(repos);
      })
      .catch((error) => {
        console.log(`Erreur de recupération des repos: ${error}`);
      });
  };

  return {
    addFavorite,
    isStar,
    getFavoritesRepos,
    removeFavorite,
  };
};

export default firestoreService;
