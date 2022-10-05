import Head from 'next/head'
import Router from 'next/router'

import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react'
import Loading from '../common/loading'


const Auth = (props: { authState: { status: string }; title: string; children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined }) => {
  if (props.authState.status === 'in') {
    Router.push('/')
    return <Loading preloading fixed={undefined} />
  } else if (props.authState.status !== 'out') {
    return <Loading preloading fixed={undefined} />
  }
  return (
    <>
      <Head>
        <title>{props.title ? 'FR8 - ' + props.title : 'FR8 - Track'}</title>
        <link rel='icon' href='https://www.fr8.in/images/favicon.ico' type='image/x-icon' />
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <section className='aligner'>
        {props.children}
      </section>
    </>
  )
}

export default Auth
