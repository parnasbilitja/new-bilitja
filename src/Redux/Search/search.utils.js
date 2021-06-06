export const removeAirline =(list=[],wanted)=>{
    const data = list.filter(x=> x != wanted)
    return data
}