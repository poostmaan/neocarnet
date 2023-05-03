import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthRoutes } from '../auth';
import { DashboardRoutes } from '../dashboard/routes';

import { authStatuses } from '../constants';
import { useAuthStore } from '../hooks';
import { Loading } from '../components';


export const AppRouter = () => {

    const { authenticated } = useAuthStore()

    if(authenticated === "checking") return <Loading />

    return (
        <Routes>
            {
                (authenticated !== 'authenticated')
                    ? <Route path="/auth/*" element={<AuthRoutes />} />
                    : <Route path="/*" element={<DashboardRoutes />} />
            }

            <Route path="/*" element={<Navigate to="/auth/login" />} />
        </Routes>
    )
}
