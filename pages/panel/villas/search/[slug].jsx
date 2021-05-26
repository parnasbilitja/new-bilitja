
//  http://localhost:3000/Ali/hasan
// pages/blog/[slug].js

import { useRouter } from 'next/router'
import Villa from "../../../Pages/manager/villa/Villa.page";

export default function SearchPost() {
  const router = useRouter()
  const { slug } = router.query

  return <Villa id={slug}/>
}