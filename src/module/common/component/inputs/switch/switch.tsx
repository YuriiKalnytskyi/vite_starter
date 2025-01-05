import { getIn, useFormikContext } from 'formik';


import * as Styled from './switch.styled.ts';

export interface ISwitch {
  name: string;
  label?: string;
  noFormikValue?: {
    value: boolean;
    onSetValue: (name: string, value: unknown) => void;
  };
}

export const Switch = ({ name, label, noFormikValue }: ISwitch) => {
  const { setFieldValue, value } = (() => {
    if (noFormikValue) {
      return {
        value: noFormikValue.value,
        setFieldValue: noFormikValue.onSetValue
      };
    } else {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { values, setFieldValue } = useFormikContext();
      return {
        value: getIn(values, name),
        setFieldValue: setFieldValue
      };
    }
  })();

  const onChange = () => {
    setFieldValue(name, !value);
  };

  return (
    <Styled.CheckBoxWrapper>
      <Styled.CheckBox id={name} type="checkbox" checked={value} onChange={onChange} />
      <Styled.CheckBoxLabel htmlFor={name} />
      {label && <Styled.Label>{label}</Styled.Label>}
    </Styled.CheckBoxWrapper>
  );
};
