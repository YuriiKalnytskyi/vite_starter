import { getIn, useFormikContext } from 'formik';

import { ICheckBoxFormik } from '@/module/common/types';

import * as Styled from './check-box-formik.styled';

export const CheckBoxFormik = ({
  name,
  label,
  colorText,
  background,
  isMulti,
  labelValue = '',
    visibleItem,
  ...props
}: ICheckBoxFormik) => {
  const { values, setFieldValue, setValues } = useFormikContext();


  const value = getIn(values, name);



  const isValue = labelValue ? labelValue : label;


  const _label =  visibleItem ? label[visibleItem] :  label
  const _value = isMulti && Array.isArray(value) ? visibleItem ? value.find((v)=> v[visibleItem] ===  label[visibleItem] )  :  value.includes(isValue) : visibleItem ? _label === value[visibleItem]  :  value;


  const onChange = () => {
    if (isMulti && Array.isArray(value)) {
      setValues((v: any) => {
        const prevValue = getIn(v, name);
        if (visibleItem ? value.find((v)=> v[visibleItem] ===  label[visibleItem] )  :  value.includes(isValue)) {
          prevValue.splice(prevValue.indexOf(isValue), 1);
        } else {
          prevValue.push(isValue);
        }

        return { ...v, [name]: prevValue };
      });
      return
    }
    if (!isMulti) {
      setFieldValue(name, visibleItem ? label :  !value);
    }
  };

  return (
    <Styled.Label {...props}>
      <Styled.Input
        name={name}
        type='checkbox'
        checked={_value}
        onChange={onChange}
        background={background}
      />
      <Styled.Span className='text' colorText={colorText} background={background}>
        <span>{_label}</span>
      </Styled.Span>
    </Styled.Label>
  );
};
