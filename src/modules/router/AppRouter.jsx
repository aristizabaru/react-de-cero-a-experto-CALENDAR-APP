import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';

export const AppRouter = () => {

    const authStatus = 'authenticated'; //'not-authenticated'; 

    return (
        <Routes>
            {
                ( authStatus === 'not-authenticated' )
                    ? <Route path='auth/*' element={ <LoginPage /> } />
                    : <Route path='*' element={ <CalendarPage /> } />
            }
            {/* { Fallback route } */ }
            <Route path='*' element={ <Navigate to='/auth/login' /> } />
        </Routes>
    );
};
