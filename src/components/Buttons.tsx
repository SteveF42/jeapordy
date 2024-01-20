import React from 'react'
import '../index.css'

type props = {
    children: React.ReactNode
    props: any
}

const PrimaryButton = (props : any) => {
    return (
        <button {...props} className={`text-center font-bold bg-primary text-gray-100 shadow-lg rounded-lg hover:bg-third px-6 py-3`}>
            {props.children}
        </button>
    )
}

const SecondaryButton = (props: any) => {
    return (
        <button {...props} className={`text-center font-bold bg-secondary text-gray-100 shadow-lg rounded-lg hover:bg-third px-6 py-3`}>
            {props.children}
        </button>
    )
}

export { PrimaryButton, SecondaryButton }