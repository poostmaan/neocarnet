import { Navigate, Route, Routes } from 'react-router-dom'
import { ControlPersons, MainPage, ProfilePage } from '../pages'

export const DashboardRoutes = () => {
  return (
    <Routes>
        <Route path="/profile" element={ <ProfilePage />} />
        <Route path="/dashboard" element={ <MainPage />} />
        <Route path="/dashboard/persons" element={ <ControlPersons /> } />
        <Route path="/*" element={ <Navigate to="/dashboard" /> } />
    </Routes>
  )
}
