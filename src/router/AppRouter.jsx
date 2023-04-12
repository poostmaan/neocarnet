import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthRoutes } from '../auth';
import { DashboardRoutes } from '../dashboard/routes';

import { authStatuses } from '../constants';
import { useAuthStore } from '../hooks';


export const AppRouter = () => {

    const { authenticated } = useAuthStore()

    return (
        <Routes>
            {
                ( authenticated === 'notAuthenticated')  
                    ? <Route path="/auth/*" element={ <AuthRoutes /> } />
                    : <Route path="/*" element={ <DashboardRoutes /> } />
            }

            <Route path="/*" element={ <Navigate to="/auth/login" /> } />
        </Routes>
    )
}
