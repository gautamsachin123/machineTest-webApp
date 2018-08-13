import { FETCH_COUNTRIES_REQUEST, FETCH_COUNTRIES_SUCCESS, FETCH_COUNTRIES_ERROR, DELETE_COUNTRY_REQUEST, DELETE_COUNTRY_SUCCESS, SAVE_COUNTRY_REQUEST, LOGOUT } from "./contants";

export const fetchCountriesRequest = ({name='',id='',skip=0, limit=15})=>({
    type:FETCH_COUNTRIES_REQUEST,
    name,
    id,
    skip,
    limit
});

export const fetchCountriesSuccess = (countries)=>({
    type:FETCH_COUNTRIES_SUCCESS,
    countries
});

export const fetchCountriesError = (error)=>({
    type:FETCH_COUNTRIES_ERROR,
    error
})

export const deleteCountryRequest = (id,skip,limit)=>({
    type:DELETE_COUNTRY_REQUEST,
    id,skip,limit
})
export const deleteCountrySuccess = (data)=>({
    type:DELETE_COUNTRY_SUCCESS,
    data
})
export const saveCountryData = (model)=>({
    type:SAVE_COUNTRY_REQUEST,model
});
export const logoutHandler = ()=>({
    type:LOGOUT
});

