import { useCalendarStore, useUiStore } from '../../shared';
import './FabDelete.css';

export const FabDelete = () => {

    const { startDeletingEvent, hasEventSelected } = useCalendarStore();
    const { isDateModalOpen } = useUiStore();

    const onDeleteCalendarEvent = () => {
        startDeletingEvent();
    };

    return (
        <button
            className='btn btn-danger fab-danger'
            onClick={ onDeleteCalendarEvent }
            style={ {
                display: hasEventSelected && !isDateModalOpen ? '' : 'none'
            } }
        >
            <i className='fas fa-trash-alt'></i>
        </button>
    );
};
