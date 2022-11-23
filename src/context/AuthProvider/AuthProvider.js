import React, { useState, useEffect } from 'react'
import { createContext } from 'react'
import {
    createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile,
} from 'firebase/auth'
import app from '../../firebase/firebase.config'
import { toast } from 'react-toastify'

export const AuthContext = createContext()
const auth = getAuth(app)

const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    //Create User
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //Update Name and photoURL
    const updateUserProfile = (name, photo) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        })
    }

    // Handle Google Signin
    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    // handle Logout
    const logout = () => {
        setLoading(true)
        localStorage.removeItem('computerBazar-token')
        toast.success('You have logged out from Computer Bazar');
        return signOut(auth)
    }

    // sign in with email and Password
    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    //reset Password
    const resetPassword = email => {
        setLoading(true)
        return sendPasswordResetEmail(auth, email)
    }

    useEffect(() => {
        //on statechange observer
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('observer', currentUser);
            setUser(currentUser)
            setLoading(false)
        })

        return () => {

            unsubscribe()
        }
    }, [])

    const authInfo = {
        user,
        loading,
        createUser,
        updateUserProfile,
        signInWithGoogle,
        logout,
        signIn,
        resetPassword,
        setLoading,
    }

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    )
}

export default AuthProvider
