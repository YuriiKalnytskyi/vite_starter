import { Form, Formik } from 'formik';
import { ReactNode, useState } from 'react';

import cancelIcon from '@/assets/icons/cancel.svg';
import editIcon from '@/assets/icons/edit-file-icon.svg';
import saveIcon from '@/assets/icons/save.svg';
import { Input } from '@/module/common/component';
import { useClickOutside } from '@/module/common/hooks';
import { IconCommon } from '@/module/common/styles';
import { COLORS } from '@/theme';

import * as Styled from './input-accordion.styled.ts';

interface IInputAccordion {
    label: string;
    value: string;
    onSubmit: (data: any) => void;
    validationSchema?: any;
    childrenValues: {
        name: string;
        label?: string;
        value: string;
        type?: string;
        startIcon?: string | any;
    }[];
    subChildren?: ReactNode;
    readOnly?: boolean;
    noClickOutside?: boolean;
}

export const InputAccordion = ({
    value,
    label,
    onSubmit,
    validationSchema,
    childrenValues,
    subChildren,
    readOnly,
    noClickOutside
}: IInputAccordion) => {
    const [isOpen, setIsOpen] = useState(false);

    const onSetIsOpen = (flag?: boolean) => {
        setIsOpen(flag ?? false);
    };

    const { ref } = useClickOutside(() => {
        if (isOpen && !noClickOutside) {
            onSetIsOpen();
        }
    });
    const _onSubmit = (data: any) => {
        onSubmit(data);
        if (label !== 'Email') {
            onSetIsOpen();
        }
    };
    return (
        <>
            {!isOpen ? (
                <Styled.WrapperInputUser readOnly={readOnly} ref={ref}>
                    <div>
                        <Styled.Label>{label}</Styled.Label>
                        <p className='value'>{value}</p>
                    </div>
                    <IconCommon
                        icon={editIcon}
                        className='edit'
                        cursor='pointer'
                        onClick={onSetIsOpen.bind(this, true)}
                    />
                </Styled.WrapperInputUser>
            ) : (
                <Styled.WrapperInputUser readOnly={readOnly} ref={ref}>
                    <Formik
                        enableReinitialize
                        key={value}
                        initialValues={childrenValues.reduce<Record<string, string>>(
                            (acc, item) => {
                                acc[item.name] = item.value;
                                return acc;
                            },
                            {}
                        )}
                        onSubmit={_onSubmit}
                        validationSchema={validationSchema}
                    >
                        {({ isValid }) => (
                            <Form>
                                <Styled.Container>
                                    {childrenValues.map(({ value, ...propsValue }, index) => {
                                        return (
                                            <Input
                                                height='2.5rem'
                                                {...propsValue}
                                                key={index + propsValue.name}
                                                startIcon={{
                                                    icon: propsValue.startIcon,
                                                    height: '1rem'
                                                }}
                                                labelClassName='labelInput'
                                            />
                                        );
                                    })}

                                    {subChildren}
                                </Styled.Container>
                                <div className='buttons'>
                                    <button type='submit' disabled={!isValid} className='save'>
                                        <IconCommon
                                            icon={saveIcon}
                                            height='1rem'
                                            cursor='pointer'
                                            background={`${COLORS.gray400}`}
                                        />
                                    </button>
                                    <button type='button' className='cancel'>
                                        <IconCommon
                                            icon={cancelIcon}
                                            height='1rem'
                                            cursor='pointer'
                                            background={`${COLORS.gray400}`}
                                            onClick={onSetIsOpen.bind(this, false)}
                                        />
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Styled.WrapperInputUser>
            )}
        </>
    );
};
