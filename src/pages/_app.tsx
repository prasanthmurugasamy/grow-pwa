import '../styles/globals.css'
import { useEffect, useState } from 'react'
import AppState from '../context/appState'
import { auth } from '../lib/auth'
import LoginLayout from '../components/loginLayout'
import { withApollo } from '../lib/apollo'

function MyApp(Props:any) {
  const [authState, setAuthState] = useState({ status: 'loading' })
  useEffect(() => {
    return auth(setAuthState)
  }, [])
  const { Component, pageProps, router } = Props
  if (router.pathname.startsWith("/login")) {
    return (
      <LoginLayout authState={authState} title={"Login"}>
        <Component {...pageProps} />
      </LoginLayout>
    );
  }
  return (
   <AppState authState={authState}>
        <Component {...pageProps}  />
   </AppState>
  )}

  export default withApollo({ ssr: true })(MyApp)
