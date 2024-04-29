import React, { useState, useRef } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import {createUserWithEmailAndPassword} from "firebase/auth";
import { auth } from '../utils/firebase';
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BACKGROUND_IMG, USER_AVATAR } from '../utils/constants';


const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const dispatch = useDispatch();

  const toggleSignInForm = () =>{
    setIsSignInForm(!isSignInForm);
  }

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const handleButtonClick = () => {
    const msg = checkValidData(email?.current?.value, password?.current?.value);
    setErrorMsg(msg);
    if(msg){
      // if there is error msg just return.
      return; 
    }else {
      if(!isSignInForm){
        // !isSignInForm -> we are on signup form
        //singup code from firebase
        createUserWithEmailAndPassword(auth, email?.current?.value, password?.current?.value)
          .then((userCredential) => {
            const user = userCredential.user;
            updateProfile(user, {
              displayName: name?.current?.value, 
              photoURL: USER_AVATAR
            }).then(() => {
              // Profile updated!
              // we see that after login in redux state we see null for dsplayName and photoURL
              // hence we have to dispatch the stateChanged as we do in Body.js
              // this time we take the prop from the current user (updated value from the user).
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
            }).catch((error) => {
              // An error occurred
              setErrorMsg(error.message);
            });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMsg(errorCode + " - " + errorMessage);
          });
      }else {
        // isSignInForm -> we are on signIn form
        // SignIn Logic
        signInWithEmailAndPassword(auth, email?.current?.value, password?.current?.value)
          .then((userCredential) => {
            // Signed in 
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMsg(errorCode + " - " + errorMessage);
          });
      }
    }
  }

  return (
    <div>
       <Header></Header>
      <div className='absolute'>
        <img
          src={BACKGROUND_IMG}
          alt='NA'
        />
      </div>
      <form onSubmit={(e)=>e.preventDefault()} className='absolute p-12 bg-black w-3/12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-85'>
        <h1 className='font-bold text-3xl py-4'>{isSignInForm ? 'Sign In' : 'Sign Up'}</h1>
        {
          !isSignInForm && (<input ref={name} type='text' placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700'></input>)
        }
        <input ref={email} type='text' placeholder='Email Address' className='p-4 my-4 w-full bg-gray-700'></input>
        <input ref={password} type='password' placeholder='Password' className='p-4 my-4 w-full bg-gray-700'></input>
        <p className='text-red-500 font-bold text-lg p-2'>{errorMsg}</p>
        <button 
          onClick={handleButtonClick}
          className='p-4 my-4 bg-red-700 rounded-lg w-full'>{isSignInForm ? 'Sign In' : 'Sign Up'}</button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm ? 'New to Netflix? Sign Up Now' : 'Already Registered? Sign In Now'}
        </p>
      </form>
    </div>
  )
}

export default Login