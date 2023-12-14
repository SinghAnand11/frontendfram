import React from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../AuthSlice'
import { Navigate } from 'react-router-dom'

export const Protected = ({children}) => {

    const loggedInUser=useSelector(selectLoggedInUser)

    if(!loggedInUser){
        return <Navigate to={'/login'} replace={true}></Navigate>
    }

    return children
}
