import { useState,useCallback,useEffect } from "react";

export function useLocalStorage(key,initialValue) {
    
    const [value, setValue] = useState(() => {
      try {
        const item = window.localStorage.getItem(key)
        return item ? JSON.parse(item) : initialValue
      } 
      catch (error) {
        console.log(error)
        return initialValue
      }
    })
  
    const setStoredValue = useCallback(val => {
  
          if(val && val !== undefined && val !== null){
            window.localStorage.setItem(key, JSON.stringify(val))
          }
          else{
            window.localStorage.removeItem(key)
          }
      },
      [value, key]
    )
  
    useEffect(() => {
      setStoredValue(value)
    }, [value, setStoredValue])
  
    return [value, setValue]
}