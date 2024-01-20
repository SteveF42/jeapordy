import React from 'react'

const InputSecondary = (props : any) => {
    return (
        <input
            {...props}
            autoComplete="given-name"
            className="focus:outline-none block w-full rounded-md border-0 px-2 py-3 bg-slate-200 text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400 ring-1 ring-inset focus:ring-2 focus:ring-secondary sm:text-sm sm:leading-6"
        />
    )
}

export {InputSecondary}