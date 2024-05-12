import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './modules/router';
import { Provider } from 'react-redux';
import { store } from './modules/store';

export const CalendarApp = () => {
    return (
        <Provider store={ store }>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </Provider>

    );
};
