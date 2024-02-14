import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const getUserCreatedBoards = async () => {
    const res = await fetch('http://localhost:3000/api/boardCreate', {
        method: "GET",
        headers: headers(),
        credentials: 'include',
        next:{
            revalidate:0
        }
    })
    if(res.status === 500){
        redirect('/')
    }
    return await res.json();
}

export const createNewBoard = async () => {
    const res = await fetch('/api/boardCreate', {
        method: "POST",
        headers: headers(),
        credentials: "include"
    })
}