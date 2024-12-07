

export const Constants = {
    'versionNumber': '1.0'
}

export const emailValidation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const PasswordValidation = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");


export const numberValidation = /^[0-9]*$/

export const googleWeClientId = '187768807077-1gu2i0mf41lc9eear6nmfjtfvriu1vsf.apps.googleusercontent.com'


// export const decimalRegex = /^([1-9]{0,2})*[.]?[0-9]{0,2}$/

export const decimalRegex = /^\d{1,2}(\.\d{1,2})?$/

export enum HttpMethods {
    'Post' = 'POST',
    'Get' = 'GET',
    'Put' = 'PUT',
    'Delete' = 'DELETE'
}

export const commonStrings = {
    "NoInternetTitle": 'Oops, No Internet Connection',
    "NoInternetSubtitle": 'Make sure wifi or cellular data is turned on and then try again.',
    "ForgotPassword": 'Forgot Password',
}

export const WorkFrequencyArray = [
    {
        'id': 1,
        'title': 'Weekly'
    },
    {
        'id': 2,
        'title': 'Monthly'
    },
    {
        'id': 3,
        'title': 'Daily'
    },
    {
        'id': 4,
        'title': 'Day'
    },

]

export const WorkTimeArray = [
    {
        'id': 1,
        'title': 'Fixed'
    },
    {
        'id': 2,
        'title': 'Flexible'
    },
]

export const rateArray = [
    {
        'id': 1,
        'title': 'Hourly'
    },
    {
        'id': 2,
        'title': 'Fixed'
    },
]

export const statusArray = [
    {
        'id': 1,
        'title': 'Active'
    },
    {
        'id': 2,
        'title': 'Inactive'
    },
]

export const TimeFormat = 'YYYY-MM-DD HH:mm'


export const ErrorMessages = {
    'countrycdevalidation':'countrycode is not valid',
    'mobileNumberValidation': 'contact number is not valid',
    'emailValidation': 'Email id is not valid',
    'emailValidation2': 'Please enter Email id',
    'passwordValidation': 'Password must have minimum 8 characters, at least one uppercase, one lowercase, one number and one special character',
    'confirmPasswordValidation': 'Both password should be same'
}
