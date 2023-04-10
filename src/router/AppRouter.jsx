import { Navigate, Route, Routes } from 'react-router-dom';

import { LoginPage } from '../auth';
import { DashboardRoutes } from '../dashboard/routes';

import { authStatuses } from '../constants';
import { useAuthStore } from '../hooks';


export const AppRouter = () => {

    const { authenticated } = useAuthStore()
    console.log(authenticated);

    return (
        <Routes>
            {
                ( authenticated === 'notAuthenticated')  
                    ? <Route path="/auth/*" element={ <LoginPage /> } />
                    : <Route path="/*" element={ <DashboardRoutes /> } />
            }

            <Route path="/*" element={ <Navigate to="/auth/login" /> } />
        </Routes>
    )
}
