import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../../store/calendar/calendarSlide';

export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector( state => state.calendar );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) );
    };

    const startSavingEvent = async ( calendarEvent ) => {
        // TODO: llegar al backend

        if ( calendarEvent._id ) {
            // Acutalizando
            dispatch( onUpdateEvent( { ...calendarEvent } ) );
        } else {
            // Creando
            dispatch( onAddNewEvent( { ...calendarEvent, _id: new Date().getTime(), } ) );
        }
    };

    const startDeletingEvent = async () => {
        // TODO: llegar al backend
        dispatch( onDeleteEvent() );
    };

    return {
        // Propiedades
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,

        // Métodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
    };
};