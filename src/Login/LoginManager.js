import * as firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseConfig } from './firebase.config';
import { getAuth, GoogleAuthProvider,signInWithPopup,createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile,FacebookAuthProvider } from "firebase/auth";


export const initializeLoginFramewaork = () => {
    if(firebase.getApps.length === 0){
        firebase.initializeApp(firebaseConfig)
    }
}

export const handleGoogleSignIn = () => {
    
    const GoogleProvider = new GoogleAuthProvider();
    const auth = getAuth();

    return signInWithPopup(auth, GoogleProvider)
    .then(result => {
        const {displayName, photoURL, email} = result.user;
        const signedInUser = {
        isSignedIn: true,
        photo: photoURL,
        name: displayName,
        email: email,
        success: true
        }
        return signedInUser;
    })
    .catch(error => {
        console.log(error.message);
    });
    };

export const handleFbSignIn = () => {
        const fbProvider = new FacebookAuthProvider();
        const auth = getAuth();

        return signInWithPopup(auth, fbProvider)
        .then(result => {
            const { displayName, photoURL, email } = result.user;
            
            const signedInUser = {
                isSignedIn: true,
                photo: photoURL,
                name: displayName,
                email: email,
                success: true,
            };
            return signedInUser;
        })
        .catch((error) => {
            console.log(error.message);
        });
    };

export const handleSignOut = () => {
        const auth = getAuth();
        return auth.signOut()
        .then(res => {
            const signedOutUser = {
            isSignedIn: false, 
            photoURL: '',
            displayName: '',
            email: '',
            error: '',
            success: false,
            }
            return signedOutUser;
        })
        .catch(error => {
            console.log(error);
        })
        }

export const CreateUserWithEmailAndPassword = (name, email, password) => {
        const auth = getAuth();
        return createUserWithEmailAndPassword(auth, email, password)
        .then(res => {
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        // setUser(newUserInfo);
        // setLoggedInUser(newUserInfo);
        updateUserInfo(name);
        return newUserInfo;
    })
    .catch((error) => {
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
        // setUser(newUserInfo);
    });
    }

export  const SignInWithEmailAndPassword = (email,password) => {
        const auth = getAuth();
        return signInWithEmailAndPassword(email, password)
        .then(res => {
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        return newUserInfo;
        })
        .catch((error) => {
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
        });
    }

    const updateUserInfo = (name) => {
        const auth = getAuth();
        if (auth.currentUser) {
            updateProfile(auth.currentUser, { displayName: name })
            .then(() => console.log("User profile updated successfully"))
            .catch(error => console.log("Profile update error:", error.message));
        }
    };