import { useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";

export function useGetProfile(){
    const [profiles, setProfiles] = useState([])

    async function getProfiles(){
        const res = await axiosReq.get('/profiles/')
        setProfiles(res.data.results)
    }

    useEffect(()=>{
        getProfiles()
    },[])
    
    return {profiles}
}