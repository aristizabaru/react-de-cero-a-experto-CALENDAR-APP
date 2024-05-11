import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './modules/router';

export const CalendarApp = () => {
    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    );
};
