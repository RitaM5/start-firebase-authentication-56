import { useState } from 'react';
import './App.css'
import app from './firebase-init-jsx';
import { getAuth, GoogleAuthProvider, signInWithPopup,GithubAuthProvider ,signOut } from "firebase/auth";
const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  //sign in
  const handleGoogleSignIn = () => {
    //console.log('wotking');
    signInWithPopup(auth, googleProvider)
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

  //github
  const handleGithub = () =>{
    signInWithPopup(auth, githubProvider)
    .then(result =>{
      const user = result.user;
      setUser(user)
    })
    .catch((error) =>{
      console.log("error khao",error);
    })
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
        user.uid ? <button onClick={handleSignOut}>Sign Out</button> :
          <>
            <button onClick={handleGoogleSignIn}>Google Sign In</button>
            <button onClick={handleGithub}>Github Sign In</button>
          </>
      }
      <h2>Name: {user.displayName}</h2>
      <p>Email: {user.email}</p>
      <img src={user.photoURL}></img>
    </div>
  )
}

export default App
