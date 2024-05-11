import { format, parse, startOfWeek, getDay } from 'date-fns';
import { dateFnsLocalizer } from 'react-big-calendar';
import { es } from 'date-fns/locale';

const locales = {
    'es': es,
};

export const localizer = dateFnsLocalizer( {
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
} );