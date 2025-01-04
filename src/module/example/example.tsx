import { useState } from 'react';


import testIcon from '@/assets/icons/vite.svg';
import { Button, CheckBox, Icon, Input, InputMatchedWords } from '@/module/common/component';
import { Table } from '@/module/common/component/table';
import { DivCommon } from '@/module/common/styles';
import { SPACES } from '@/theme';
import { dateTransform, functionStub } from '@/utils';
import { Formik, Form, getIn } from 'formik';
import { validationSchemaExample } from '@/module/example/validation/shema.ts';


const randomString = (minLength: number, maxLength: number): string => {
  const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const dataTable = Array.from({ length: 6 }, (_, index) => ({
  id: index + 1,
  user: index % 2 === 0 ? randomString(50, 500) : 'Tester',
  email: 'tester@gmail.com',
  amount: 150,
  currency: 'USD',
  createdAt: '2025-01-03T12:34:56.789Z'
}));

import *  as  Styled from './example.styled.tsx';
import { changeCard } from '@/module/common/hooks';
import { useQuery } from 'react-query';
import axios from 'axios';
import { onError } from '@/module/common/services';


export const Example = () => {

  const [page, setPage] = useState(1);


  const { data } = useQuery(
    ['country'],
    async () => {
      const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,flags,cca2');
      const countries = response.data.map((country: any) => ({
        name: country.name.common,
        icon: country.flags?.svg,
        cca2: country.cca2
      }));
      return { countries };
    },
    {
      onError: (err: any) => {
        onError(err);
      }
    }
  );

  const parseValue = (value: unknown, key: string) => {
    if (key === 'createdAt') return dateTransform(value as string ?? '');
    return value;
  };

  return (
    <Styled.Container
      height="100dvh"
      fd="column"
      gap={SPACES.xxxxl}
      padding={`${SPACES.xxxxl} ${SPACES.xxxxl}`}
    >
      <DivCommon gap={SPACES.l}>
        BUTTON STATE
        <DivCommon fd="row" gap={SPACES.l}>
          <Button content="button" variant="primary"
                  startIcon={{ icon: testIcon, height: '1.5rem' }}
                  endIcon={{ icon: testIcon, height: '1.5rem', type: 'img' }}
          />
          <Button content="button" variant="primary" isLoading={true} />
          <Button content="button" variant="primary" disabled />
        </DivCommon>

      </DivCommon>

      <DivCommon>
        <Table
          className="scroll"
          tooltipLength={25}
          linesToTruncate={3}
          arrayHeader={[
            { text: 'Id', data_key: 'id' },
            { text: 'User', data_key: 'user' },
            { text: 'Email', data_key: 'email' },
            { text: 'Amount', data_key: 'amount' },
            { text: 'Currency', data_key: 'currency' },
            { text: 'Date', data_key: 'createdAt' }
          ]}
          arrayBody={dataTable ?? []}
          parseValue={parseValue}
          pagination={{
            total: 100,
            page: page,
            pageSize: 5,
            setPage: (page) => {
              setPage(page);
            }
          }}
        />
      </DivCommon>

      <Formik
        initialValues={{
          password: '',
          email: '',
          first_name: '',
          last_name: 'test',
          card: '',
          expiry_data: '',
          cvv: ''
        }}
        onSubmit={functionStub}
        validationSchema={validationSchemaExample}
      >
        {({ values }) => (
          <Form>
            CHECKBOX STATE (default, multi, radio)
            <DivCommon fd="row" gap={SPACES.l} margin="0 0 2rem 0">
              <DivCommon height="100px" fd="row" ai="center" gap={SPACES.l}>
                <CheckBox
                  name="default"
                  type="default"
                  items="string"
                />
                <CheckBox
                  name="defaultObj"
                  type="default"
                  items={{ name: 'obj' }}
                  visibleItem="name"
                />
              </DivCommon>
              <DivCommon height="100px" fd="row" ai="center" gap={SPACES.l}>
                <DivCommon width="fit-content" gap={SPACES.l}>
                  <CheckBox
                    name="multi"
                    type="multi"
                    items={['string_1', 'string_2', 'string3']}
                  />
                </DivCommon>
                <DivCommon gap={SPACES.l}>
                  <CheckBox
                    name="multiObj"
                    type="multi"
                    items={[{ name: 'obj_1' }, { name: 'obj_2' }, { name: 'obj_3' }]}
                    visibleItem="name"
                  />
                </DivCommon>
              </DivCommon>
              <DivCommon height="100px" fd="row" ai="center" gap={SPACES.l}>
                <DivCommon width="fit-content" gap={SPACES.l}>
                  <CheckBox
                    name="radio"
                    type="radio"
                    items={['string_1', 'string_2']}
                  />
                </DivCommon>
                <DivCommon gap={SPACES.l}>
                  <CheckBox
                    name="radioObj"
                    type="radio"
                    items={[{ name: 'obj_1' }, { name: 'obj_2' }]}
                    visibleItem="name"
                  />
                </DivCommon>
              </DivCommon>
            </DivCommon>

            INPUT STATE (default, readOnly, email, password)
            <DivCommon fd="row" gap={SPACES.l} margin="0 0 2rem 0">
              <Input
                name="first_name"
                label="First Name"
              />
              <Input
                name="last_name"
                label="Last Name"
                readOnly
                startIcon={{ icon: testIcon, height: '1.5rem' }}
                endIcon={{ icon: testIcon, height: '1.5rem', type: 'img' }}
              />
              <Input
                name="email"
                label={{
                  text: 'test',
                  required: true
                }}
                startIcon={{ icon: testIcon, height: '1.5rem' }}
                endIcon={{ icon: testIcon, height: '1.5rem', type: 'img' }}
              />
              <Input
                name="password"
                label="Password"
                type="password"
              />
            </DivCommon>

            INPUT CARD
            <DivCommon fd="row" gap={SPACES.l} margin="0 0 2rem 0">
              <Input
                width="15rem"
                name="card"
                label="Card"
                placeholder="0000 0000 0000 0000"
                optionOnChange={(name, value, setFieldValue) => {
                  const _value = changeCard('card', value);
                  setFieldValue(name, _value);
                }}
              />

              <Input
                width="7rem"
                name="expiry_data"
                label="Date"
                placeholder="MM/YY"
                optionOnChange={(name, value, setFieldValue) => {
                  const _value = changeCard('date', value);
                  setFieldValue(name, _value);
                }}
              />

              <Input
                width="7rem"
                name="cvv"
                type="password"
                label="CVV"
                placeholder=""
                optionOnChange={(name, value, setFieldValue) => {
                  const _value = changeCard('cvc', value);
                  setFieldValue(name, _value);
                }}
              />
            </DivCommon>

            INPUTMATCHEDWORDS
            <DivCommon fd="row" gap={SPACES.l} ai='flex-end' margin="0 0 2rem 0">
              <InputMatchedWords
                name="test"
                label="Default"
                items={['test', 'test2', 'test3', 'test4']}
              />

              <InputMatchedWords
                name="multi_input"
                label="Multi"
                items={['test', 'test2', 'test3', 'test4']}
                type={{
                  type: 'multi'
                }}
              />

              <InputMatchedWords
                name="country"
                label="Countri"
                items={data?.countries ?? []}
                {
                  ...(getIn(values, 'country')?.icon ?
                      {
                        startIcon: {
                          icon: getIn(values, 'country').icon,
                          type: 'img'
                        }
                      }
                      : null
                  )
                }
                visibleItem="name"
                parseValue={(value, valueObj) => {
                  return (
                    <DivCommon fd="row" gap={SPACES.l}>
                      <Icon icon={valueObj.icon} type="img" />
                      {value}
                    </DivCommon>
                  );
                }}
                filterOption={{
                  mode: 'default',
                  includes: 'startsWith',
                  type: 'sort'
                }}
              />

              <InputMatchedWords
                name="country"
                label="Countri Filter "
                items={data?.countries ?? []}
                {
                  ...(getIn(values, 'country')?.icon ?
                      {
                        startIcon: {
                          icon: getIn(values, 'country').icon,
                          type: 'img'
                        }
                      }
                      : null
                  )
                }
                visibleItem="name"
                parseValue={(value, valueObj) => {
                  return (
                    <DivCommon fd="row" gap={SPACES.l}>
                      <Icon icon={valueObj.icon} type="img" />
                      {value}
                    </DivCommon>
                  );
                }}
                filterOption={{
                  mode: 'new',
                  position: 'sticky',
                  includes: 'includes',
                  type: 'filter'
                }}
              />
            </DivCommon>


          </Form>
        )}
      </Formik>


    </Styled.Container>
  );
};
