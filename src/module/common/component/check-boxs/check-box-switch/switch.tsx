import { getIn, useFormikContext } from 'formik';

import { ISwitch } from '@/module/common/types';

import * as StyledCommon from '../check-box-firmik/check-box-formik.styled';
import * as Styled from './switch.styled';

export const Switch = ({ name, label }: ISwitch) => {
  const { values, setFieldValue } = useFormikContext();
  const value = getIn(values, name);

  const onChange = () => {
    setFieldValue(name, !value);
  };

  return (
    <Styled.CheckBoxWrapper>
      <Styled.CheckBox id={name} type='checkbox' checked={value} onChange={onChange} />
      <Styled.CheckBoxLabel htmlFor={name} />
      {label && <StyledCommon.Label>{label}</StyledCommon.Label>}
    </Styled.CheckBoxWrapper>
  );
};
