/* eslint-disable react/prop-types */
export const CalendarEvent = ( { event } ) => {
    console.log( event );
    const { title, user } = event;

    return (
        <>
            <strong>{ title }</strong>
            <span> - { user.user }</span>
        </>
    );
};
