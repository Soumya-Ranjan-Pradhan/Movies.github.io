// Context Api 
// useContext hooks

// context (warehouse)
// Provider (delivery Boy)
// Consumer (useContext(YOU))
import React, { useContext, useEffect, useState } from "react";
export const API_URL = `http://www.omdbapi.com/?apikey=727bbdc1`;
// 1st Writing
const  AppContext = React.createContext();
// we need to create a provider 

// 2nd Writing in Provider
const  AppProvider = ({ children }) =>{
// 6th Writing
const [isLoading, setIsLoading] = useState(true)
const [movie, setMovie] = useState([])
const [isError, setIaError] = useState({ show :"true",mag:""})
const [query, setQuery] = useState("titanic")
    // 5th Writing
const getMovies = async(url) =>{
    setIsLoading(true)
    try{
        const res = await fetch(url);
        const data = await res.json();
        console.log(data)
        if(data.Response === "True"){
            setIsLoading(false);
            setIaError({
                show:false,
                mag: "",
            })
            setMovie(data.Search);
        }else{
            setIaError({
                show:"true",
                msg:data.Error,
            });
        }
    }catch(error){
        console.log(error)
    }
}


// 4th Writing 
useEffect(()=>{
    // 7th Writing
  const timerOut = setTimeout(()=>{
        getMovies(`${API_URL}&s=${query}`);
    },500)

    return() => clearTimeout(timerOut)
    // getMovies(`${API_URL}&s=${query}`);
},[query])

return <AppContext.Provider value={{isLoading, isError,movie, query,setQuery}}>
{children}
</AppContext.Provider>
}

// 3rd Writing (create a Global custom hook)
const useGlobalContext = () =>{
    return useContext(AppContext)
}
export { AppContext, AppProvider,useGlobalContext};