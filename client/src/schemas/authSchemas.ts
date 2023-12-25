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
