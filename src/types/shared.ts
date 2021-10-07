import { z } from 'zod';
import dayjs from 'dayjs';

export const DateString = z.string().refine((date) => dayjs(date).isValid(), { message: 'Invalid date string' });
