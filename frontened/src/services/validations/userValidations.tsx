import * as yup from 'yup'

export const validationSchema=yup.object().shape({
    username:yup.string().required("username is required"),
    email:yup.string().email().required("email is required"),
    phone:yup.string().required("phone number is reqiured"),
    password:yup.string().required("password is required")
})
export const loginValidationSchema=yup.object().shape({
    username:yup.string().required("username is required"),
   
    password:yup.string().required("password is required")
})

// password:yup.string().min(4).max(10).required()