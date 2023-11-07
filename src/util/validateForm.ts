import * as yup from 'yup'

export const signInValidate = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required()
})

export const signUpValidate = yup.object().shape({
    name: yup.string().required().max(35),
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup
        .string()
        .required('Please Enter your password')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\.])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    confirmPassword: yup.string().required().oneOf([yup.ref('password')], 'Passwords must match')
})

