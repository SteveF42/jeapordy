import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const getUserCreatedBoards = async () => {
    const res = await fetch(process.env.NEXTAUTH_URL + '/api/boardCreate', {
        method: "GET",
        headers: headers(),
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
    })
}