
//  http://localhost:3000/Ali/hasan
// pages/blog/[slug].js

import { useRouter } from 'next/router'

export default function Post1() {
  const router = useRouter()
  const { slug } = router.query

  return <h1>Post Slug: {slug}</h1>
}