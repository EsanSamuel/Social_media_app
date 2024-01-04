"use client"
import React, { createContext, useState } from 'react'

interface Props {
    children: React.ReactNode
}

export interface IValue {
    toastMsg: any
    setToastMsg: any
}

export const ToastContext = createContext<IValue | null>(null)

const ToastProvider = ({ children }: Props) => {
    const [toastMsg, setToastMsg] = useState()
    return (
        <ToastContext.Provider value={{ toastMsg, setToastMsg }}>
            {children}
        </ToastContext.Provider>
    )
}

export default ToastProvider