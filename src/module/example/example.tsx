import { Form, Formik } from 'formik';
import { useState } from 'react';



import testIcon from '@/assets/icons/vite.svg';
import { Button, CheckBoxFormik, Country, Drawer, Input, InputCalendar, InputMatchedWords, InputMatchedWordsDynamic, InputTextArea, Phone, Portal, Switch } from '@/module/common/component';
import { AvatarSetup } from '@/module/common/component/avatar-setup';
import { Table } from '@/module/common/component/table';
import { InputsConst } from '@/module/common/constants';
import { DrawerLayout, PopupLayout, PopupLayoutBottom } from '@/module/common/layout';
import { DivCommon } from '@/module/common/styles';
import { validationSchemaExample } from '@/module/example/validation/shema';
import { SPACES } from '@/theme';
import { dateTransform } from '@/utils';



import * as Styled from './example.styled';


export const Example = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openPopupInDrawer, setOpenPopupInDrawer] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);

  const onToggle = () => {
    setOpenDrawer((prev) => !prev);
  };

  const onTogglePopupInDrawer = () => {
    setOpenPopupInDrawer((prev) => !prev);
  };
  const onTogglePopup = () => {
    setOpenPopup((prev) => !prev);
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const nawDate = new Date()
  const [date, setDate] = useState({from: new Date(nawDate.setDate(nawDate.getDate() - 1)), to: new Date()});
  const [page, setPage] = useState(1);

  const dataTable = [
    {
      id: 1,
      user: 'Tester',
      email: 'tester@gmail.com',
      amount: 150,
      currency: 'USD',
      createdAt: '2025-01-03T12:34:56.789Z'
    },
    {
      id: 1,
      user: 'Tester',
      email: 'tester@gmail.com',
      amount: 150,
      currency: 'USD',
      createdAt: '2025-01-03T12:34:56.789Z'
    },
    {
      id: 1,
      user: 'Tester',
      email: 'tester@gmail.com',
      amount: 150,
      currency: 'USD',
      createdAt: '2025-01-03T12:34:56.789Z'
    }
  ];

  // const parseValue = (value: any, key: string, index: number) => {
  const parseValue = (value: any, key: string) => {
    if (key === 'createdAt') return dateTransform(value ?? '');
    // if (key === 'email') return data.rows[index]?.user?.email;
    return value;
  };

  return (
    <DivCommon
      height='100dvh'
      fd='row'
      gap={SPACES.xxxxl}
      padding={`${SPACES.xxxxl} ${SPACES.xxxxl}`}
    >
      <Styled.InputContainer height='100%' width='25%'>
        <Formik
          initialValues={{
            last_name: '',
            password: '',
            email: '',
            text: '',
            add_category: [],
            category: [],
            is_remember: false,
            avatar: '',
            country: {},
            phone: '',
            calendar: {}
          }}
          onSubmit={onSubmit}
          validationSchema={validationSchemaExample}
        >
          {({ values }) => (
            <Form>
              <DivCommon gap={SPACES.l} padding='0 1rem 0 0' width='20rem'>

                <AvatarSetup name='avatar' label='avatar' />
                <Country name='country'/>
                <Phone label={'Phone'} name='phone'/>

                <Input {...InputsConst.last_name} />
                <Input {...InputsConst.password} type='password' />
                <Input {...InputsConst.email} placeholder='' inputType={2} />
                <InputCalendar
                  name='calendar'
                  height='3rem'
                  mode='range'
                  label='Date:'
                  placeholder='DD.MM.YYY - DD.MM.YYY'
                  noFormikValue={{
                    value: date,
                    onSetValue: (_, value) => setDate(value as any)}}
                />
                <InputTextArea
                  name='text'
                  label={'text'}
                  placeholder='text'
                  rows={2}
                  maxLength={1000}
                  mt={SPACES.xxxxxxls}
                />
                <InputMatchedWordsDynamic
                  name='add_category'
                  label='Add Category'
                  placeholder='Add Category'
                />
                <InputMatchedWords
                  matchedWords={values.add_category}
                  name='category'
                  label='Choice Category'
                  placeholder='Choice Category'
                />
                <CheckBoxFormik name='is_remember' label='Remember for 30 days' />
                <Switch name='is_remember' label='Remember for 30 days' />



                <Button content='Submit' variant='primary' type='submit' />
              </DivCommon>
            </Form>
          )}
        </Formik>
      </Styled.InputContainer>

      <DivCommon>
        <DivCommon gap={SPACES.l} width='25%'>
          BUTTON STATE
          <Button content='button'  variant='primary' startIcon={{icon: testIcon, height: '1.5rem'}} endIcon={{icon: testIcon, height: '1.5rem', type: 'color'}} />
          <Button content='button' variant='primary' isLoading={true}/>
          <Button content='button' variant='primary' disabled />
        </DivCommon>

        <DivCommon>
          <Table
            arrayHeader={[
              {text: 'Id', data_key: 'id', className: 'id'},
              {text: 'User', data_key: 'user'},
              {text: 'Email', data_key: 'email'},
              {text: 'Amount', data_key: 'amount'},
              {text: 'Currency', data_key: 'currency'},
              {text: 'Date', data_key: 'createdAt'}
            ]}
            arrayBody={ dataTable ?? []}
            parseValue={parseValue}
            pagination={{
              total: 0,
              page: page,
              pageSize: 10,
              setPage: (page) => {
                setPage(page);
              }
            }}
          />
      </DivCommon>

      </DivCommon>



      {/*<Button content='open popup' variant='inverse' onClick={onTogglePopup} />*/}

      {/*<Button content='open drawer' variant='primary' onClick={onToggle} endIcon={{icon: testIcon}} />*/}

      <Drawer onClose={onToggle} open={openDrawer}>
        <DrawerLayout title={'Test'} onClose={onToggle}>
          <Button content='open Popup' variant='primary' onClick={onTogglePopup} />
          <Button
            mt={SPACES.l}
            content='open Popup Bottom'
            variant='primary'
            onClick={onTogglePopupInDrawer}
          />
        </DrawerLayout>
      </Drawer>

      {openPopupInDrawer ? (
        <Portal>
          <PopupLayout onClose={onTogglePopupInDrawer}>in openPopupInDrawer</PopupLayout>
        </Portal>
      ) : null}

      {openPopup ? (
        <Portal>
          <PopupLayoutBottom onClose={onTogglePopup}>PopupLayoutBottom</PopupLayoutBottom>
        </Portal>
      ) : null}
    </DivCommon>
  );
};
