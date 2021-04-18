import firebase from 'src/utils/firebaseConfig';
import 'firebase/firestore';

const db = firebase.firestore();

const firestoreService = () => {
  const checkRepo = (user, repo) => {
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

  const addUser = (user, repo) => {
    const userRef = db.collection('users');
    userRef.doc(user.uid).set({
      name: user.displayName,
      email: user.email,
      photoUrl: user.photoURL,
    })
      .then(() => {
        console.log('Utilisateur créé.');
        checkRepo(user, repo);
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
        checkRepo(user, repo);
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error(`Erreur de mise à jour de l'utilisateur : ${error}`);
      });
  };

  // check if user is already in register
  const checkUser = (user, repo) => {
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

  const addFavorite = (user, repo) => {
    // #check if user exist -> next create or update collection
    checkUser(user, repo);
  };

  return {
    addFavorite,
    isStar,
  };
};

export default firestoreService;