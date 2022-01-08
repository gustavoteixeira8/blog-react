import { format, formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';

export const formatDate = (date) => {
  return format(new Date(date), 'yyyy-MM-dd HH:mm', { locale: enUS });
};

export const formatDistanceDate = (date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};
