import * as Yup from 'yup';

import { validateSchema } from '@/module/common/validation/validate-shema';

export const validationSchemaExample = Yup.object().shape({
  last_name: validateSchema.name,
  password: validateSchema.password,
  email: validateSchema.email,
  text: validateSchema.text.max(10)
});
