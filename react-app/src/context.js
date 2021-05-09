import { useContext, useState, useEffect, createContext } from 'react'
import { auth } from './firebase'
export { auth, db } from './firebase'

const context = createContext()

export function useAuth() {
  return useContext(context)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  const signup = (email, password, fullName = '') => {
    let promise = new Promise(function (resolve, reject) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((ref) => {
          ref.user.updateProfile({
            displayName: fullName,
          })

          resolve(ref)
        })
        .catch((error) => reject(error))
    })

    return promise
  }

  const signin = (email, password) => {
    let promise = new Promise(function (resolve, reject) {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((ref) => {
          resolve(ref)
        })
        .catch((error) => {
          reject(error)
        })
    })

    return promise
  }

  const signout = () => {
    // window.localStorage.removeItem('celoSecretKey')
    return auth.signOut()
  }

  const passwordReset = (email) => {
    let promise = new Promise(function (resolve, reject) {
      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          resolve(`Password Reset Email sent to ${email}`)
        })
        .catch((error) => {
          reject(error)
        })
    })

    return promise
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log(user)
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [currentUser])

  const value = {
    currentUser,
    signup,
    signin,
    signout,
    passwordReset,
  }

  return (
    <context.Provider value={value}>{!loading && children}</context.Provider>
  )
}

// export const db
