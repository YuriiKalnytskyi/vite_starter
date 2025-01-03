import * as Styled from './country.styled.ts';
import {useQuery} from "react-query";
import axios from "axios";
import {onError} from "@/module/common/services";

interface ICountry {
    name: string;
    label?: string;
    placeholder?: string;
    isRequiredArrow?: boolean;
    height?:string
    width?:string

}

export const Country = ({name, label, placeholder, isRequiredArrow, height, width}: ICountry) => {
    const {data} = useQuery(
        ['country'],
        async () => {
            const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,flags,cca2');
            const countries = response.data.map((country: any) => ({
                name: country.name.common,
                icon: country.flags?.svg,
                cca2: country.cca2
            }));
            return {countries};
        },
        {
            onError: (err: any) => {
                onError(err)
            }
        }
    );

    return data?.countries?.length > 0 ? (
        <Styled.Countries
            height={height}
            width={width}
            matchedWords={data?.countries ?? [{name: '', icon: ''}]}
            name={name}
            label={label}
            placeholder={placeholder}
            visibleItem='name'
            visibleIcon='icon'
            isAutoComplete
            isFilter
            isEdit
            isFilterVisibleAllData
            isRequiredArrow={isRequiredArrow}
        />
    ) : (
        <p>Loading countries...</p>
    );
};
