import * as yup from "yup";

export const signInSchema = yup
    .object({
        email: yup
            .string()
            .required("Email is required")
            .email("Email must be a valid email"),
        password: yup
            .string()
            .required("Password is required")
            .min(5, "Password must be at least 5 characters long"),
    })
    .required();

export const signUpSchema = yup
    .object({
        username: yup
            .string()
            .required("Username is required")
            .min(5, "Username must be at least 5 characters"),
        email: yup
            .string().
            required("Email is required")
            .email("Email is invalid"),
        password: yup
            .string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters"),
        confirmPassword: yup
            .string()
            .required("Please confirm the password")
            .oneOf([yup.ref("password")], "Passwords must match"),
    })
    .required();
