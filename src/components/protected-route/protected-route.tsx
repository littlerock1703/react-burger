import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

interface ProtectedRouteProps {
  allowLogedIn?: boolean
  element: React.JSX.Element
}

export const ProtectedRoute = ({ allowLogedIn = false, element }: ProtectedRouteProps) => {
  const { user } = useSelector((state) => state.user)
  const location = useLocation()

  if (!allowLogedIn && !user) {
    return <Navigate to="/login" state={{ from: location }} />
  }

  if (allowLogedIn && user) {
    return <Navigate to={location.state?.from || '/'} />
  }

  return <>{element}</>
}

export const AllowAuth = ProtectedRoute
export const AllowUnAuth = ({element}: { element: React.JSX.Element}): React.JSX.Element => <ProtectedRoute allowLogedIn={true} element={element} />
