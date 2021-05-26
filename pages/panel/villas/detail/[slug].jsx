
//  http://localhost:3000/Ali/hasan
// pages/blog/[slug].js
import VilaDetial from '../../../Pages/manager/villa/VilaDetail.page'
import { useRouter } from 'next/router'

export default function SearchPost() {
  const router = useRouter()
  const { slug } = router.query

  return <VilaDetial />
}