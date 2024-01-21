import { useEffect, useState, useRef, MutableRefObject } from 'react'


const useOutsideClick = (ref : MutableRefObject<HTMLElement>) => {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const handleClick = (event : any) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsVisible(false);
            }
        }

        document.addEventListener("mousedown", handleClick)
        return () => {
            document.removeEventListener("mousedown", handleClick);
        }
    }, [ref])
    return { ref, isVisible, setIsVisible }
}


export default useOutsideClick;