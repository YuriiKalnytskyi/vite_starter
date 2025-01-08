import axios from 'axios';
import { Form, Formik, getIn } from 'formik';
import { useState } from 'react';
import { useQuery } from 'react-query';

import testIcon from '@/assets/icons/vite.svg';
import {
  Button,
  Calendar,
  CheckBox,
  Icon,
  Input,
  Inputs,
  MatchedWords,
  Switch,
  Table,
  TextArea
} from '@/module/common/component';
import {changeCard} from '@/module/common/hooks';
import {onError} from '@/module/common/services';
import {DivCommon} from '@/module/common/styles';
import {validationSchemaExample} from '@/module/example/validation/shema.ts';
import {SPACES} from '@/theme';
import {dateTransform, functionStub} from '@/utils';
import arrowBottomIcon from '@/assets/icons/default/arrow-bottom-icon.svg';

import * as Styled from './example.styled.tsx';
import {APP_KEYS} from '../common/constants/index.ts';
import {DrawerLayout, PopupLayout} from '@/module/common/layout';
import {useThemeStore} from '@/store';
import {DropDown} from "@/module/common/component/drop-down/drop-down.tsx";
import {useTheme} from "styled-components";

const randomString = (minLength: number, maxLength: number): string => {
  const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};


//TODO replace the plus cone

//InputMatchedWords
//TODO search input correct startIcon
//TODO remove focus from input after selecting an item

//Input
//TODO add arrows for number type

//Loader
//TODO optimization loader ...

//Phone
//TODO delete component and to DropDown ...

//Pagination
//TODO add input to ...

//Calendar
//TODO check click to calendar ...

export const Example = () => {
  const [page, setPage] = useState(1);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [slidePosition, setSlidePosition] = useState<'bottom' | 'top' | 'left' | 'right' | 'center'>('bottom');
  const [contentPosition, setContentPosition] = useState<'bottom' | 'top' | 'center' | 'left' | 'right'>('bottom');
  const [slidePositionDrawer, setSlidePositionDrawer] = useState<'bottom' | 'top' | 'left' | 'right'>('right');
  const [contentPositionDrawer, setContentPositionDrawer] = useState<'bottom' | 'top' | 'left' | 'right'>('right');

  const dataTable = Array.from({ length: 6 }, (_, index) => ({
    id: index + 1,
    user: page % 2 === 0 ? (index % 2 === 0 ? 'Tester' : randomString(50, 1000)) : (index % 2 === 0 ? randomString(50, 500) : 'Tester'),
    email: 'tester@gmail.com',
    amount: 150,
    currency: 'USD',
    createdAt: '2025-01-03T12:34:56.789Z'
  }));

    const {data} = useQuery(
        ['country'],
        async () => {
            const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,flags,cca2,idd');
            const countries = response.data.map((country: any) => ({
                name: country.name.common,
                icon: country.flags?.svg,
                cca2: country.cca2,
                phone: country.idd.root + country.idd?.suffixes.join('')
            }));
            return {countries};
        },
        {
            onError: (err: any) => {
                onError(err);
            }
        }
    );
    console.log(data)
    const parseValue = (value: unknown, key: string) => {
        if (key === 'createdAt') return dateTransform((value as string) ?? '');
        return value;
    };

  const onTogglePopup = (slidePosition: 'bottom' | 'top' | 'left' | 'right' | 'center' | null, contentPosition: 'bottom' | 'top' | 'center' | 'left' | 'right' | null) => {
    setOpenPopup((prev) => !prev);
    slidePosition && setSlidePosition(slidePosition);
    contentPosition && setContentPosition(contentPosition);

  };
  const onToggle = (slidePosition: 'bottom' | 'top' | 'left' | 'right' | null, contentPosition: 'bottom' | 'top' | 'left' | 'right' | null) => {
    setOpenDrawer((prev) => !prev);
    slidePosition && setSlidePositionDrawer(slidePosition);
    contentPosition && setContentPositionDrawer(contentPosition);
  };

    const {theme: themeStore, setTheme} = useThemeStore();
    const theme = useTheme();

    return (
        <Styled.Container
            height="100dvh"
            fd="column"
            gap={SPACES.xxxxl}
            padding={`${SPACES.xxxxl} ${SPACES.xxxxl}`}
        >
            <button
                onClick={() => {
                    setTheme(themeStore === 'light' ? 'dark' : 'light');
                }}
            >
                {themeStore === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            </button>
            <DivCommon gap={SPACES.l}>
                BUTTON STATE
                <DivCommon fd="row" gap={SPACES.l}>
                    <Button
                        content="button"
                        variant="primary"
                        startIcon={{icon: testIcon, height: '1.5rem'}}
                        endIcon={{icon: testIcon, height: '1.5rem', type: 'img'}}
                    />
                    <Button content="button" variant="primary" isLoading={true}/>
                    <Button content="button" variant="primary" disabled/>
                    <Button.AsNavLink
                        to={APP_KEYS.ROUTER_KEYS.HOME}
                        content="navigation button "
                    />
                </DivCommon>
            </DivCommon>

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

            <Formik
                initialValues={{
                    password: '',
                    email: '',
                    first_name: '',
                    last_name: 'test',
                    card: '',
                    expiry_data: '',
                    cvv: '',
                    phone: ''
                    // resizable: randomString(50, 1000)
                }}
                onSubmit={functionStub}
                validationSchema={validationSchemaExample}
            >
                {({values, setFieldValue}) => (
                    <Form>
                        CHECKBOX STATE (default, multi, radio)
                        <DivCommon fd="row" gap={SPACES.l} margin="0 0 2rem 0">
                            <DivCommon height="100px" fd="row" ai="center" gap={SPACES.l}>
                                <Inputs.CheckBox name="default" type="default" items="string"/>
                                <CheckBox
                                    name="defaultObj"
                                    type="default"
                                    items={{name: 'obj'}}
                                    visibleItem="name"
                                />
                            </DivCommon>
                            <DivCommon height="100px" fd="row" ai="center" gap={SPACES.l}>
                                <DivCommon width="fit-content" gap={SPACES.l}>
                                    <CheckBox name="multi" type="multi" items={['string_1', 'string_2', 'string3']}/>
                                </DivCommon>
                                <DivCommon gap={SPACES.l}>
                                    <CheckBox
                                        name="multiObj"
                                        type="multi"
                                        items={[{name: 'obj_1'}, {name: 'obj_2'}, {name: 'obj_3'}]}
                                        visibleItem="name"
                                    />
                                </DivCommon>
                            </DivCommon>
                            <DivCommon height="100px" fd="row" ai="center" gap={SPACES.l}>
                                <DivCommon width="fit-content" gap={SPACES.l}>
                                    <CheckBox name="radio" type="radio" items={['string_1', 'string_2']}/>
                                </DivCommon>
                                <DivCommon gap={SPACES.l}>
                                    <CheckBox
                                        name="radioObj"
                                        type="radio"
                                        items={[{name: 'obj_1'}, {name: 'obj_2'}]}
                                        visibleItem="name"
                                    />
                                </DivCommon>
                            </DivCommon>
                            <DivCommon height="100px" fd="row" ai="center" gap={SPACES.l}>
                                <Inputs.Switch name="switch" label="Switch"/>
                                <Switch name="switch" label="Switch"/>
                            </DivCommon>
                        </DivCommon>

            INPUT CARD
            <DivCommon fd="row" gap={SPACES.l} margin="0 0 2rem 0">
              <Inputs
                width="15rem"
                name="card"
                label="Card"
                placeholder="0000 0000 0000 0000"
                optionOnChange={(name, value, setFieldValue) => {
                  const _value = changeCard('card', value);
                  setFieldValue(name, _value);
                }}
              />

              <Inputs
                width="7rem"
                name="expiry_data"
                label="Date"
                placeholder="MM/YY"
                optionOnChange={(name, value, setFieldValue) => {
                  const _value = changeCard('date', value);
                  setFieldValue(name, _value);
                }}
              />

              <Inputs
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
            INPUT STATE (default, readOnly, email, password)
            <DivCommon fd="row" gap={SPACES.l} margin="0 0 2rem 0">
              <Input name="first_name" label="First Name" isSpellCheck />
              <Input
                name="last_name"
                label=" Name"
                readOnly
                width="400px"
                startIcon={{ icon: testIcon, height: '1.5rem' }}
                endIcon={{ icon: testIcon, height: '1.5rem', type: 'img' }}
              />
              <Input
                name="email"
                label={{
                  text: 'Email',
                  required: true
                }}
                startIcon={{ icon: testIcon, height: '1.5rem' }}
                endIcon={{ icon: testIcon, height: '1.5rem', type: 'img' }}
              />
              <Input name="password" label="Password" type="password" />
            </DivCommon>
            INPUTMATCHEDWORDS
            <Styled.Sctol fd="row" gap={SPACES.l} ai="flex-end" margin="0 0 2rem 0">
              <Inputs.MatchedWords
                width="400px"
                name="test"
                label="Default"
                items={['test', 'test2', 'test3', 'test4']}
              />

              <MatchedWords
                name="test"
                width="400px"
                label="Default"
                items={['test', 'test2', 'test3', 'test4']}
                readOnly
              />

              <MatchedWords
                width="400px"
                name="country"
                label="Countri (Type-filter) (Input - default)"
                items={data?.countries ?? []}
                {...(getIn(values, 'country')?.icon
                  ? {
                    startIcon: {
                      icon: getIn(values, 'country').icon,
                      type: 'img'
                    }
                  }
                  : null)}
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
                  type: 'filter',
                  isSavePreviousSelection: false
                }}
              />
              <MatchedWords
                width="400px"
                name="country_multi"
                label="Countri (Type-sort - Input -new )  (Multi Select) (Dynamic items)"
                items={data?.countries ?? []}
                visibleItem="name"
                parseValue={(value, valueObj) => {
                  return (
                    <DivCommon fd="row" gap={SPACES.l}>
                      {valueObj.icon && <Icon height="1rem" icon={valueObj.icon} type="img" />}
                      {value}
                    </DivCommon>
                  );
                }}
                filterOption={{
                  mode: 'new',
                  position: 'sticky',
                  includes: 'includes',
                  type: 'sort'
                }}
                type={{
                  mode: 'multi',
                  parseValue: (value, valueObj) => {
                    return (
                      <DivCommon fd="row" ai="center" gap={SPACES.l}>
                        {valueObj.icon && <Icon height="1rem" icon={valueObj.icon} type="img" />}
                        {value}
                      </DivCommon>
                    );
                  },
                  addNewItem: true
                }}
              />
            </Styled.Sctol>

            Phone
            <DivCommon fd="row" gap={SPACES.l} ai="flex-end" margin="0 0 2rem 0">

                            <MatchedWords
                                width="400px"
                                name="phone"
                                label="phone (Type-sort - Input -new ) "
                                items={data?.countries ?? []}
                                visibleItem="phone"
                                parseValue={(value, valueObj) => {
                                    return (
                                        <DivCommon fd="row" ai='center' gap={SPACES.l}>
                                            {valueObj.icon && <Icon height="1rem" icon={valueObj.icon} type="img"/>}
                                            {valueObj.name} {' '}
                                            {value}
                                        </DivCommon>
                                    );
                                }}
                                {...(getIn(values, 'phone')?.icon
                                    ? {
                                        startIcon: {
                                            icon: getIn(values, 'phone').icon,
                                            type: 'img'
                                        }
                                    }
                                    : null)}
                                filterOption={{
                                    mode: 'default',
                                    includes: 'startsWith',
                                    type: 'filter',
                                    isSavePreviousSelection: false
                                }}
                            />

                            <DropDown
                                visibleBlock={({focused, onSetIsFocused}) => {
                                    return (
                                        <Input
                                            name='new-phone'
                                            label='Phone'
                                            {...(getIn(values, 'new-phone')?.icon
                                                ? {
                                                    startIcon: {
                                                        icon: getIn(values, 'new-phone').icon,
                                                        type: 'img'
                                                    }
                                                }
                                                : null)}
                                            endIcon={{icon: arrowBottomIcon, className: focused ? 'rotate' : '', cursor: 'pointer', onClick: ()=> {
                                                    onSetIsFocused(!focused)
                                                }}}
                                            // onClick={onSetIsFocused.bind(this, true)}
                                            noFormikValue={{
                                                value: getIn(values, 'new-phone')?.phone ?? '',
                                                setFieldValue: (_, value)=> {
                                                    setFieldValue('new-phone', {icon: getIn(values, 'new-phone')?.icon ?? '', phone: value})
                                                }
                                            }}
                                        />
                                    )
                                }}
                                popupBlock={({onSetIsFocused}) => {
                                    return (

                                        <ul style={{maxHeight: '10rem', overflow:'auto'}}>
                                            {data?.countries.map((country:any, i:any) => (
                                                <li key={i}
                                                    style={{display: 'flex',alignItems: 'center', gap: '1rem', padding: '0.5rem'}}
                                                           onClick={()=>{
                                                               setFieldValue('new-phone', {icon: country.icon, phone: country.phone}).then();
                                                               onSetIsFocused(false);
                                                           }}
                                                >
                                                    {country.icon && <Icon height="1rem" icon={country.icon} type="img"/>}
                                                    {country.name} {' '}
                                                    {country.phone}
                                                </li>
                                            ))}
                                        </ul>
                                    )
                                }}
                            />
                        </DivCommon>

            CALENDAR
            <DivCommon fd="row" gap={SPACES.l} ai="flex-end" margin="0 0 2rem 0">
              <Inputs.Calendar
                label="Calendar (Date)"
                name="calendar_single"
                mode="single"
                visibleOfMonths={1}
              />
              <Calendar
                width="400px"
                label="Calendar (Date) "
                name="calendar_single"
                mode="single"
                visibleOfMonths={1}
                readOnly
              />
              <Calendar
                label="Calendar ({ftom:Date, to:Date }) "
                name="calendar_range"
                mode="range"
                disabledDay={new Date()}
              />
              <Calendar
                label="Calendar (Date[])"
                name="calendar_multiple"
                mode="multiple"
              />
            </DivCommon>

            TEXTAREA
            <DivCommon gap={SPACES.l} ai="flex-end" margin="0 0 2rem 0">
              <Inputs.TextArea
                name="first_name"
                rows={3}
                label="TextArea"
                resizable={false}
                maxLength={300}
              />
            </DivCommon>

            <TextArea
              name="resizable"
              rows={2}
              label="TextArea resizable"
              resizable
            />


            DRAWER
            <DivCommon fd="row" gap="2rem" margin="0 0 2rem 0">
              <Button content="left" variant="primary" onClick={onToggle.bind(this, 'left', 'left')} />
              <Button content="right" variant="primary" onClick={onToggle.bind(this, 'right', 'right')} />
              <Button content="top" variant="primary" onClick={onToggle.bind(this, 'top', 'left')} />
              <Button content="bottom" variant="primary"
                      onClick={onToggle.bind(this, 'bottom', 'right')} />

            </DivCommon>

            POPUP FULLSCREEN
            <DivCommon fd="row" gap="2rem" margin="0 0 2rem 0">
              <Button content="top" variant="primary"
                      onClick={onTogglePopup.bind(this, 'top', 'center')} />
              <Button content="bottom" variant="primary"
                      onClick={onTogglePopup.bind(this, 'bottom', 'center')} />
              <Button content="left" variant="primary"
                      onClick={onTogglePopup.bind(this, 'left', 'center')} />
              <Button content="right" variant="primary"
                      onClick={onTogglePopup.bind(this, 'right', 'center')} />
              <Button content="center" variant="primary"
                      onClick={onTogglePopup.bind(this, 'center', 'center')} />
            </DivCommon>

            POPUP MOBILE
            <DivCommon fd="row" gap="2rem">
              <Button content="top" variant="primary"
                      onClick={onTogglePopup.bind(this, 'top', 'top')} />
              <Button content="bottom" variant="primary"
                      onClick={onTogglePopup.bind(this, 'bottom', 'bottom')} />
            </DivCommon>

          </Form>
        )}
      </Formik>


      <DrawerLayout title={'Test'}
                    open={openDrawer}
                    slidePosition={slidePositionDrawer}
                    contentPosition={contentPositionDrawer}
                    onClose={onToggle.bind(this, null, null)}
      >
        <DivCommon margin="3rem 0">
          POPUP BUTTON
          <DivCommon gap="3rem" margin="0 0 3rem 0">
            <Button content="top" variant="primary"
                    onClick={onTogglePopup.bind(this, 'top', 'center')} />
            <Button content="bottom" variant="primary"
                    onClick={onTogglePopup.bind(this, 'bottom', 'center')} />
            <Button content="left" variant="primary"
                    onClick={onTogglePopup.bind(this, 'left', 'center')} />
            <Button content="right" variant="primary"
                    onClick={onTogglePopup.bind(this, 'right', 'center')} />
            <Button content="center" variant="primary"
                    onClick={onTogglePopup.bind(this, 'center', 'center')} />
          </DivCommon>
        </DivCommon>

      </DrawerLayout>

      <PopupLayout
        open={openPopup}
        onClose={onTogglePopup.bind(this, null, null)}
        slidePosition={slidePosition}
        contentPosition={contentPosition}
      >
        sdsdsdds
      </PopupLayout>

            DROPDOWN
            <DivCommon fd='row' gap='2rem'>
                {[
                    {
                        position: 'left',
                        hover: true,
                        width: '70%',
                        title: 'Hover & Click - Left',
                    },
                    {
                        position: 'right',
                        hover: true,
                        width: '70%',
                        title: 'Hover & Click - Right',
                    },
                    {
                        hover: true,
                        title: 'Hover & Click - 100%',
                    },
                ].map((item, index) => (
                    <DropDown
                        key={index}
                        position={item?.position as "left" | "right" ?? "right"}
                        isHover={item?.hover}
                        isClick
                        width={item?.width}
                        visibleBlock={({focused}) => {
                            return (
                                <div style={{
                                    userSelect: 'none',
                                    width: 'fit-content',
                                    height: '2.5rem',
                                    padding: '0 1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: `1px solid transparent`,
                                    borderColor: focused ? `${theme.COLORS.primary}` : 'transparent'
                                }}>
                                    {item.title}
                                </div>
                            )
                        }}
                        popupBlock={({onSetIsFocused}) => {
                            return (
                                <DivCommon>
                                    {[1, 2, 3, 4, 5].map((itemPopup, i) => (
                                        <div key={i} style={{paddingLeft: '0.5rem'}}
                                             onClick={onSetIsFocused.bind(this, false)}> item {itemPopup}</div>
                                    ))}
                                </DivCommon>
                            )
                        }}
                    />
                ))}
            </DivCommon>


    </Styled.Container>
  );
};
