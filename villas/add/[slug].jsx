
//  http://localhost:3000/Ali/hasan
// pages/blog/[slug].js

import { useRouter } from 'next/router'

export default function AddPost() {
  const router = useRouter()
  const { slug } = router.query

  return <h1>add Post  page {slug}</h1>
}