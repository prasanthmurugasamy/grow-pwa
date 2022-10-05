
import Link from 'next/link'

export default function Custom404 () {
  return (
    <div className='aligner'>
      <div>
        <h1>404</h1>
        <p>Page not found</p>
        <Link href='/'>
          <button>Go to Main Page</button>
        </Link>
      </div>
    </div>
  )
}
