import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoutes() {
    const isLogin = JSON.parse(localStorage.getItem('login')!)

    return (
        isLogin ? <Outlet /> : <Navigate to='/prod' />
    )
}