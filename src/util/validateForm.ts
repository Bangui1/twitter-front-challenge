import * as yup from 'yup'
import i18next from "i18next";

export const signInValidate = yup.object().shape({
    email: yup.string().email(i18next.t('error.email-error')).required(i18next.t('error.required')),
    password: yup.string().required(i18next.t('error.required'))
})

export const signUpValidate = yup.object().shape({
    name: yup.string().required(i18next.t('error.required')).max(35, i18next.t('error.max-35')),
    username: yup.string().required(i18next.t('error.required')),
    email: yup.string().email(i18next.t('error.email-error')).required(i18next.t('error.required')),
    password: yup
        .string()
        .required(i18next.t('error.required'))
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\.])(?=.{8,})/,
            i18next.t('error.password-error')
        ),
    confirmPassword: yup.string().required(i18next.t('error.required')).oneOf([yup.ref('password')], 'Passwords must match')
})

export const postValidate = yup.object().shape({
    content: yup.string().required(i18next.t('error.required')).max(240, i18next.t('error.content-length')),
    images: yup.array().max(4, i18next.t('error.max-images'))
})

export const chatMessageValidate = yup.object().shape({
    content: yup.string().required(i18next.t('error.required')).max(240, i18next.t('error.content-length'))
})
