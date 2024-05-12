import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { addHours } from 'date-fns';
import DatePicker, { registerLocale } from 'react-datepicker';
import Swal from 'sweetalert2';
import { differenceInSeconds } from 'date-fns/differenceInSeconds';
import { es } from 'date-fns/locale/es';
import 'sweetalert2/dist/sweetalert2.min.css';
import './CalendarModal.css';
import 'react-datepicker/dist/react-datepicker.css';
import { useMemo } from 'react';
import { useCalendarStore, useUiStore } from '../../shared';

registerLocale( 'es', es );

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement( '#root' );

export const CalendarModal = () => {

    const { isDateModalOpen, closeDateModal } = useUiStore();
    const { activeEvent, startSavingEvent } = useCalendarStore();

    const [ formValues, setFormValues ] = useState( {
        title: 'Andrés',
        notes: 'Hola',
        start: new Date(),
        end: addHours( new Date(), 2 )
    } );

    const [ formSubmitted, setFormSubmitted ] = useState( false );

    const titleClass = useMemo( () => {
        if ( !formSubmitted ) return '';

        return ( formValues.title.length > 0 )
            ? ''
            : 'is-invalid';

    }, [ formValues.title, formSubmitted ] );

    useEffect( () => {
        if ( activeEvent !== null ) {
            setFormValues( {
                ...activeEvent
            } );
        }

    }, [ activeEvent ] );


    const onDateChanged = ( event, changing ) => {
        setFormValues( {
            ...formValues,
            [ changing ]: event
        } );
    };

    const onInputChange = ( { target } ) => {
        setFormValues( {
            ...formValues,
            [ target.name ]: target.value
        } );
    };

    const onCloseModal = () => {
        closeDateModal();
    };

    const onSubmit = async ( event ) => {
        event.preventDefault();
        setFormSubmitted( true );

        const difference = differenceInSeconds( formValues.end, formValues.start );

        if ( isNaN( difference ) || difference <= 0 ) {
            console.log( 'Error en fechas' );
            Swal.fire( 'Fechas incorrectas', 'Revisar las fechas ingresadas', 'error' );
            return;
        }

        if ( formValues.title <= 0 ) {
            console.log( 'Se necesita un título' );
            return;
        }

        console.log( 'Enviando form...' );
        await startSavingEvent( formValues );
        closeDateModal();
        setFormSubmitted( false );
    };

    return (
        <Modal
            isOpen={ isDateModalOpen }
            onRequestClose={ onCloseModal }
            style={ customStyles }
            className='modal'
            overlayClassName='modal-fondo'
            closeTimeoutMS={ 200 }
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form
                className="container"
                onSubmit={ onSubmit }
            >

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker
                        locale='es'
                        selected={ formValues.start }
                        className='form-control'
                        onChange={ ( event ) => onDateChanged( event, 'start' ) }
                        dateFormat='Pp'
                        showTimeSelect
                        timeCaption='Hora'
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        locale='es'
                        minDate={ formValues.start }
                        selected={ formValues.end }
                        className='form-control'
                        onChange={ ( event ) => onDateChanged( event, 'end' ) }
                        dateFormat='Pp'
                        showTimeSelect
                        timeCaption='Hora'
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={ `form-control ${titleClass}` }
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={ formValues.title }
                        onChange={ onInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ formValues.notes }
                        onChange={ onInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    );
};
