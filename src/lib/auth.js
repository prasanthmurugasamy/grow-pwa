import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged ,GoogleAuthProvider,signInWithPopup} from "firebase/auth";
 import 'firebase/database'
import { getDatabase, ref, onValue } from "firebase/database";
import Router from 'next/router'
import { message } from 'antd'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import  {changeSubscriptionToken}  from './apolloClient'

  initializeApp({
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_ID
  })

  const fauth = getAuth();
const auth = (setAuthState) => {

  return onAuthStateChanged(fauth,async user => {
    if (user) {
      if (user.email.endsWith('@fr8.in')) {
        const token = await user.getIdToken()
        let idTokenResult = await user.getIdTokenResult()
        let hasuraClaim = idTokenResult.claims['https://hasura.io/jwt/claims']

        if (hasuraClaim) {
          // @ts-ignore
            const roles = hasuraClaim['x-hasura-allowed-roles']
            localStorage.setItem('token', token)
          setAuthState({ status: 'in', user, token, roles })
        } else {
          // Check if refresh is required.
          const db = getDatabase();
          const metadataRef =
            ref(db,'metadata/' + user.uid + '/refreshTime')

            onValue(metadataRef, async data => {
            if (!data.exists) {
              return
            }
            const token = await user.getIdToken(true)
            idTokenResult = await user.getIdTokenResult()
            hasuraClaim = idTokenResult.claims['https://hasura.io/jwt/claims']
            if (hasuraClaim) {
              localStorage.setItem('token', token)
              const roles = hasuraClaim['x-hasura-allowed-roles']
              setAuthState({ status: 'in', user, token, roles })
            } else {
              await fauth.signOut()
              setAuthState({ status: 'out' })
            }
          })
        }
      } else {
        await fauth.signOut()
        setAuthState({ status: 'out' })
        message.error('Please use FR8 email id')
      }
    } else {
      setAuthState({ status: 'out' })
    }
  })
}

const provider = new GoogleAuthProvider()
const signInWithGoogle = async () => {
  try {
    await signInWithPopup(fauth,provider)
  } catch (error) {
    console.log(error)
  }
}
const signOut = async () => {
  try {
    await fauth.signOut()
    Router.push('/login')
  } catch (error) {
    console.log(error)
  }
}

const refreshToken = (reload) => {
  try{
  const token = localStorage.getItem('token')
  if(token){
  const decodedToken = jwt.decode(token)
  const expiryTime = decodedToken.exp
  const currentTime = new Date().getTime()
  // let userId = decodedToken.user_id;
  const appendExpiry = expiryTime + '000'
  const parsing = parseInt(appendExpiry) - 600000 // expire time minus 10 minutes
  if ((moment().diff(moment(parsing))) >= 0) {
    onAuthStateChanged(fauth,async user => {
      if (user) {
        const token = await user.getIdToken(true)
        changeSubscriptionToken(token)
        localStorage.setItem('token', token)
      }
    })
    if(reload){
      window.location.reload()
    }
  }
 }
}
catch(error){
  localStorage.clear()
  Router.push('/login')
}
}

export { auth, signInWithGoogle, signOut, refreshToken }
