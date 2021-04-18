import firebase from 'src/utils/firebaseConfig';
import 'firebase/firestore';

const db = firebase.firestore();

const firestoreService = () => {
  const addUser = (user) => {
    const userRef = db.collection('users');
    userRef.doc(user.uid).set({
      name: user.displayName,
      email: user.email,
      photoUrl: user.photoURL,
    })
      .then(() => {
        console.log('Utilisateur créé.');
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error(`Erreur de création de l'utilisateur : ${error}`);
      });
  };

  const updateUser = (user) => {
    const userRef = db.collection('users').doc(user.uid);
    return userRef.update({
      name: user.displayName,
      email: user.email,
      photoUrl: user.photoURL,
    })
      .then(() => {
        console.log('Utilisateur mis à jour.');
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error(`Erreur de mise à jour de l'utilisateur : ${error}`);
      });
  };

  const checkUser = (user) => {
    const docRef = db.collection('users').doc(user.uid);
    docRef.get()
      .then((doc) => {
        if (doc.exists) {
          console.log('Utilisateur existant:', doc.data());
          updateUser(user);
        }
        else {
          // doc.data() will be undefined in this case
          console.log('L\'utilisateur n\'existe pas !');
          addUser(user);
        }
      }).catch((error) => {
        console.log(`Erreur de vérification de l'utilisateur : ${error}`);
      });
  };

  const addFavorite = (user, repo) => {
    // #check if user is auth
    checkUser(user);
    // #check if user exist in Firestore
    // # -> if note create him
    // # is isStar === false-> add repo in FS favorites
    // # is isStar === true -> remove it
    /*
    db.collection('users')
      .add({
        first: 'Ada',
        last: 'Lovelace',
        born: 1815,
      })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
      */
  };

  return {
    addFavorite,
  };
};

export default firestoreService;
