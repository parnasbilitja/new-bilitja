// import React, {useEffect, useState} from 'react';
// import styles from '../../../../../styles/newTour/components/subComponent/Paginate.module.scss'
// import {useRouter} from "next/router";
// const Paginate = ({from, to,currentPage, apiCall,param,scrollToTop}) => {
//     const [el, setEl] = useState([])
//     const[selectedpage,setSelectedPage]=useState(1)
//     const router=useRouter()
//     const paginateElGen = (to) => {
//         let arr = []
//         for (let i = 1; i <= to; i++) {
//             arr.push(i)
//         }
//         setEl(arr)
//     }
//     useEffect(() => {
//         // debugger
//         paginateElGen(to)
//     }, [to])
//
//
//     function scrollTotop() {
//         var body =document.getElementsByTagName("body")
//         body[0].scrollTo({ top: 0, left: 0, behavior: "smooth" });
//     }
//     return (
//         to &&
//         <div className={styles['paginate-container']}>
//             <div className={styles["paginate"]}>
//                 {
//                     el.map(i => {
//                         return (
//                             <div className={styles[selectedpage===i? "active":"pagenumber"]}  onClick={()=> {
//                                 apiCall(i)
//                                 setSelectedPage(i)
//                                 if(scrollToTop===true) {
//                                     scrollTotop()
//                                 }
//                             }
//                             }>{i}</div>
//                         )
//                     })
//                 }
//             </div>
//         </div>
//
//     );
// };
//
// export default Paginate;





import React, {useEffect, useState} from 'react';
import styles from '../../../../../styles/newTour/components/subComponent/Paginate.module.scss'
import {useRouter} from "next/router";


// interface Props {
//     to: number;
//     apiCall: (page: number) => void;
//     scrollToTop?: boolean;
//     currentPage?: any;
// }
const Paginate=({ to, apiCall,scrollToTop})=>{
    const [el, setEl] = useState([])
    const[selectedpage,setSelectedPage]=useState(1)
    const [stagedPage,setstagedPage]=useState([])

    const [firstfour,setFirstfour]=useState([])
    const [secondFour,setSecondtFour]=useState([])
    const [lastfour,setLastFour]=useState([])
    const [middleArr,setMiddleArr]=useState([])
    const [middleArrExtra,setMiddleArrExtra]=useState([])


    const paginateElGen = (to) => {
        let arr = []
        for (let i = 1; i <= to; i++) {
            arr.push(i)
        }
        setEl(arr)
    }
    useEffect(() => {
        // debugger
        paginateElGen(to)
    }, [to])


    const paginateStaging=()=> {
        setMiddleArr(el.slice(4,el.length-4))
        setFirstfour(el.slice(0, 4))

        if (el.length > 5) {
            setLastFour(el.slice(-4))
        } else {

            setLastFour(el.slice(4, el.length))


        }
    }
    // useEffect(() => {
    //     console.log(firstfour,lastfour,middleArr)

    // }, [firstfour,lastfour,middleArr]);
    useEffect(() => {

        paginateStaging()
    }, [el]);

    useEffect(()=>{

        setstagedPage([...firstfour,middleArrExtra,...secondFour,middleArr,...lastfour])
    },[middleArr,firstfour,lastfour,middleArrExtra,secondFour])

    // const handleClick=()=>{
    //
    // }
    useEffect(()=>{

        if(selectedpage+1 ===middleArr[0] ){
            let newmiddleArr=middleArr
            let removedFromMiddleArray=newmiddleArr.splice(0,1)
            setMiddleArr(newmiddleArr)
            setSecondtFour((prev)=>[...prev,...removedFromMiddleArray])
        }

        if(selectedpage-1 ===middleArrExtra[middleArrExtra.length-1] ){

            let newmiddleArr=middleArrExtra
            let secondfour=secondFour
            let newsecondfour=secondFour[secondfour.length-1]
            secondfour.pop()
            setMiddleArr((prev)=>[newsecondfour,...prev])
            let removedFromMiddleArray=newmiddleArr.splice(newmiddleArr.length-1,1)
            setMiddleArrExtra(newmiddleArr)
            setSecondtFour([...removedFromMiddleArray,...secondfour])
        }

    },[selectedpage])

    useEffect(() => {

        if(secondFour.length>6){
            let newsecondfour=secondFour
            let removedFromSeconFour=newsecondfour.splice(0,1)
            setMiddleArrExtra((prev)=>[...prev,...removedFromSeconFour])
            setSecondtFour(newsecondfour)

        }
    }, [secondFour]);



    function scrollTotop() {
        var body =document.getElementsByTagName("html")
        body[0].scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
    return (
        to &&
        <div className={styles['paginate-container']}>
            <div className={styles["paginate"]}>
                {
                    stagedPage.map((i,index) => {
                        return (
                            Array.isArray(i) ? ( i.length>0 &&  <div key={index} className={styles["pagenumber"]}
                                >...</div>):
                                <div className={styles[selectedpage===i? "active":"pagenumber"]} key={index}  onClick={()=> {
                                    apiCall(i)
                                    setSelectedPage(i)
                                    if(scrollToTop===true) {
                                        scrollTotop()
                                    }
                                }
                                }>{i}</div>
                        )
                    })
                }
            </div>
        </div>

    );
}

export default Paginate;
