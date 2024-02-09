import React from 'react'
import '../index.css'

type props = {
    children: React.ReactNode
    props: any
}

const PrimaryButton = (props: any) => {
    return (
        <button {...props} className={`text-center font-bold bg-primary text-gray-100 shadow-lg rounded-lg hover:opacity-80 px-6 py-3 ${props.className}`}>
            {props.children}
        </button>
    )
}

const SecondaryButton = (props: any) => {
    return (
        <button {...props} className={`text-center font-bold bg-secondary text-gray-100 shadow-lg rounded-lg hover:opacity-80 px-6 py-3`}>
            {props.children}
        </button>
    )
}

const BoardButton = (props: any) => {
    return (
        <button type="button" className={`button-group rounded-s-md px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200
     hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2  
     dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 ${props.className}`} {...props}>{props.children}</button>
    )
}

export { PrimaryButton, SecondaryButton, BoardButton }