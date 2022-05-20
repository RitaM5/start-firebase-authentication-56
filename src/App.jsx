import { useState } from 'react';
import './App.css'
import app from './firebase-init-jsx';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});
  const provider = new GoogleAuthProvider();
  //sign in
  const handleGoogleSignIn = () => {
    //console.log('wotking');
    signInWithPopup(auth, provider)
      .then(result => {
        const user = result.user;
        console.log(user);
        //console.error(user);
        setUser(user);
      })
      .catch((error) => {
        console.log('error khaiso', error);
      });
  }
  //sign out
  const handleSignOut = () => {
    signOut(auth)

      .then(() => {
        setUser({});
      })

      .catch(error => {
        setUser({});
      })
  }

  return (
    <div className="App">
      {
      user.email ? <button onClick={handleSignOut}>Sign Out</button> :
      <button onClick={handleGoogleSignIn}>Google Sign In</button>
      }
      <h2>Name: {user.displayName}</h2>
      <p>Email: {user.email}</p>
      <img src={user.photoURL}></img>
    </div>
  )
}

export default App
