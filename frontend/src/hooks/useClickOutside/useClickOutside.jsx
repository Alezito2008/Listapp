import { useEffect } from "react";

export default function useClickOutside(ref, callback){
    useEffect(() => {
        function handler(event){
            if(ref.current && !ref.current.contains(event.target)){
                callback();
            }
        }
        window.addEventListener("click", handler);
        window.addEventListener("touchstart", handler);
        return () => {
            window.removeEventListener("click", handler);
            window.removeEventListener("touchstart", handler);
        }
    }, [ref])
}