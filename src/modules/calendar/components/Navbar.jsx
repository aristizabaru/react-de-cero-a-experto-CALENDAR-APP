import { useAuthStore } from '../../shared';

export const Navbar = () => {

    const { startLogout, user } = useAuthStore();

    return (
        <div className='navbar navbar-dark bg-dark mb-4 px-4'>
            <span className='navbar-brand'>
                <i className='fas fa-calendar-alt mx-2'></i> { user.name }
            </span>
            <button
                className='btn btn-outline-danger'
                onClick={ startLogout }
            >
                <i className='fas fa-sign-out-alt mx-2'></i>
                <span>Salir</span>
            </button>
        </div>
    );
};
