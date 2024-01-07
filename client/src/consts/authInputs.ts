export const AUTH_INPUT_FIELDS = {
    username: {
        name: 'username' as const,
        placeholder: 'Username',
        type: 'text' as const,
    },
    email: {
        name: 'email' as const,
        placeholder: 'Email',
        type: 'email' as const,
    },
    password: {
        name: 'password' as const,
        placeholder: 'Password',
        type: 'password' as const,
    },
    confirmPassword: {
        name: 'confirmPassword' as const,
        placeholder: 'Confirm Password',
        type: 'password',
    },
};
