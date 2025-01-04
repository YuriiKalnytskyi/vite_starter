import { getIn, useFormikContext } from 'formik';

import * as Styled from './phone.styled.ts';

export const Phone = ({ label, name, width }: { label: string; name: string; width?: string }) => {
  const { setFieldValue, errors, values, touched } = useFormikContext();

  const touche = getIn(touched, name);
  const error = getIn(errors, name);
  const isError = touche ? error : touche || error;

  return (
    <Styled.PhoneWrapper width={width} isError={isError}>
      <label>{label}</label>
      <Styled.Phone
        isError={isError}
        value={getIn(values, name)}
        onChange={(phone) => setFieldValue(name, phone)}
      />
    </Styled.PhoneWrapper>
  );
};
