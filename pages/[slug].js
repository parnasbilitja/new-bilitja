
//  http://localhost:3000/Ali/hasan
// pages/blog/[slug].js
import Villa from './Pages/manager/villa/Villa.page'
import AddVila from './Pages/manager/villa/AddVilla.page'

import { useRouter } from 'next/router'

export default function RoutePagingInHome() {
  const router = useRouter()
  const { slug } = router.query
  
  switch (slug ){ 
     case 'search':
       
          return <div><Villa/></div>;
     case 'add':
          return <AddVila/>;

      default:
          return <h1>default page { slug } </h1>;
          }

}