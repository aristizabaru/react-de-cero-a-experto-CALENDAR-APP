import { addHours } from 'date-fns';
import { useCalendarStore, useUiStore } from '../../shared';
import './FabAddNew.css';

export const FabAddNew = () => {

    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();

    const onNewCalendarEvent = () => {
        setActiveEvent( {
            title: '',
            notes: '',
            start: new Date(),
            end: addHours( new Date(), 2 ),
            bgColor: '#fafafa',
            user: {
                _id: 123,
                user: 'Andres',
            }
        } );
        openDateModal();
    };

    return (
        <button
            className='btn btn-primary fab'
            onClick={ onNewCalendarEvent }
        >
            <i className='fas fa-plus'></i>
        </button>
    );
};
