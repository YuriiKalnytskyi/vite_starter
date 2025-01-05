import * as Yup from 'yup';

import i18next from '@/module/common/i18n/config.ts';
import { validateSchema } from '@/module/common/validation/validate-shema';

export const validationSchemaExample = Yup.object().shape({
  password: validateSchema.password,
  email: validateSchema.email,
  first_name: validateSchema.name,
  last_name: validateSchema.name,
  phone: validateSchema.email,

  card: validateSchema.text,
  expiry_data: Yup.string()
    .test('valid-expiry', i18next.t('common.Month_is_incorrect'), (value) => {
      if (value) {
        const [month] = value.split('/');
        const monthNumber = parseInt(month, 10);
        if (monthNumber < 1 || monthNumber > 12) {
          return false;
        }
      }
      return true;
    })
    .test('valid-year', i18next.t('common.Year_is_incorrect'), (value) => {
      if (value) {
        const [, year] = value.split('/');
        const yearNumber = parseInt(year, 10);
        const currentYear = new Date().getFullYear();
        const currentYearShort = currentYear % 100;
        if (yearNumber < currentYearShort) {
          return false;
        }
      }
      return true;
    })
    .required('common.is_required'),
  cvv: validateSchema.text.min(3).max(3),
  country : Yup.array().of(Yup.string())
});
