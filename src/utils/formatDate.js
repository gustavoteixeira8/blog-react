import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

export const formatDate = (date) => {
  return format(new Date(date), 'yyyy-MM-dd HH:mm', { locale: enUS });
};
