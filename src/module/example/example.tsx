import axios from 'axios';
import {Form, Formik, getIn} from 'formik';
import {useState} from 'react';
import {useQuery} from 'react-query';

import testIcon from '@/assets/icons/vite.svg';
import {
    Button,
    Calendar,
    CheckBox,
    Drawer,
    Icon,
    Input,
    MatchedWords,
    Phone,
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

import * as Styled from './example.styled.tsx';
import {APP_KEYS} from '../common/constants/index.ts';
import {DrawerLayout, PopupLayout} from "@/module/common/layout";

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
//TODO delete component and to matched-worlds ...

//Pagination
//TODO add input to ...

//Calendar
//TODO check click to calendar ...

export const Example = () => {
    const [page, setPage] = useState(1);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const [popupPosition, setPopupPosition] = useState<'bottom' | 'top' | 'left' | 'right'  >('bottom');

    const dataTable = Array.from({length: 6}, (_, index) => ({
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
                idd: country.idd
            }));
            return {countries};
        },
        {
            onError: (err: any) => {
                onError(err);
            }
        }
    );

    const parseValue = (value: unknown, key: string) => {
        if (key === 'createdAt') return dateTransform((value as string) ?? '');
        return value;
    };

    const onTogglePopup = (position: 'bottom' | 'top' | 'left' | 'right' | null) => {
        setOpenPopup((prev) => !prev);
        console.log(position, '***************')
        position && setPopupPosition(position);
    };
    const onToggle = () => {
        setOpenDrawer((prev) => !prev);
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
                    {text: 'Id', data_key: 'id'},
                    {text: 'User', data_key: 'user'},
                    {text: 'Email', data_key: 'email'},
                    {text: 'Amount', data_key: 'amount'},
                    {text: 'Currency', data_key: 'currency'},
                    {text: 'Date', data_key: 'createdAt'}
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
                {({values}) => (
                    <Form>
                        CHECKBOX STATE (default, multi, radio)
                        <DivCommon fd="row" gap={SPACES.l} margin="0 0 2rem 0">
                            <DivCommon height="100px" fd="row" ai="center" gap={SPACES.l}>
                                <Input.CheckBox name="default" type="default" items="string"/>
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
                                <Input.Switch name='switch' label='Switch'/>
                                <Switch name='switch' label='Switch'/>
                            </DivCommon>
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
                        INPUT STATE (default, readOnly, email, password)
                        <DivCommon fd="row" gap={SPACES.l} margin="0 0 2rem 0">
                            <Input name="first_name" label="First Name" isSpellCheck/>
                            <Input
                                name="last_name"
                                label=" Name"
                                readOnly
                                width="400px"
                                startIcon={{icon: testIcon, height: '1.5rem'}}
                                endIcon={{icon: testIcon, height: '1.5rem', type: 'img'}}
                            />
                            <Input
                                name="email"
                                label={{
                                    text: 'Email',
                                    required: true
                                }}
                                startIcon={{icon: testIcon, height: '1.5rem'}}
                                endIcon={{icon: testIcon, height: '1.5rem', type: 'img'}}
                            />
                            <Input name="password" label="Password" type="password"/>
                        </DivCommon>
                        INPUTMATCHEDWORDS
                        <Styled.Sctol fd="row" gap={SPACES.l} ai="flex-end" margin="0 0 2rem 0">
                            <Input.MatchedWords
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
                                            <Icon icon={valueObj.icon} type="img"/>
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
                                            {valueObj.icon && <Icon height="1rem" icon={valueObj.icon} type="img"/>}
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
                                                {valueObj.icon && <Icon height="1rem" icon={valueObj.icon} type="img"/>}
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
                            <Input.Phone
                                name="phone"
                                label="Phone"
                            />
                            <Phone
                                name="phone"
                                label="Phone"
                                readOnly
                            />
                        </DivCommon>

                        CALENDAR
                        <DivCommon fd="row" gap={SPACES.l} ai="flex-end" margin="0 0 2rem 0">
                            <Input.Calendar
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
                            <Input.TextArea
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
                        <Button content='open drawer' variant='primary' onClick={onToggle}/>
                        <Button content='open popup button'  variant='primary' onClick={onTogglePopup.bind(this, 'bottom')}/>
                        <Button content='open popup left'  variant='primary' onClick={onTogglePopup.bind(this, 'left')}/>
                        <Button content='open popup right'  variant='primary'  onClick={onTogglePopup.bind(this, 'right')}/>
                        <Button content='open popup top'  variant='primary' onClick={onTogglePopup.bind(this, 'top')}/>

                    </Form>
                )}
            </Formik>

                <Drawer onClose={onToggle} open={openDrawer} contentPosition={'left'} slidePosition={'bottom'}>
                    <DrawerLayout title={'Test'} onClose={onToggle}>
                        POPUP BUTTON
                        <Button content='open popup button' variant='primary' onClick={onTogglePopup}/>
                        <Button content='open popup left'  variant='primary' onClick={onTogglePopup}/>


                    </DrawerLayout>
                </Drawer>

                <PopupLayout
                    open={openPopup}
                    onClose={onTogglePopup.bind(this, null)}
                    slidePosition={popupPosition}
                    contentPosition={'bottom'}
                >
                    sdsdsdds
                </PopupLayout>


        </Styled.Container>
    );
};
