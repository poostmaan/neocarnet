import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { DashboardMainPage } from '../pages'

export const DashboardRoutes = () => {
  return (
    <Routes>
        <Route path="/dashboard" element={ <DashboardMainPage />} />
        <Route path="/*" element={ <Navigate to="/dashboard" /> } />
    </Routes>
  )
}
