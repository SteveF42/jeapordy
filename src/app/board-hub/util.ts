import { headers } from "next/headers";

export const getUserCreatedBoards = async () => {
    const res = await fetch('http://localhost:3000/api/boardCreate', {
        method: "GET",
        headers: headers(),
        credentials: 'include'
    })
    return await res.json();
}

export const createNewBoard = async () => {
    const res = await fetch('/api/boardCreate', {
        method: "POST",
        headers: headers(),
        credentials: "include"
    })
}