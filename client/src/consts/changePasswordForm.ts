export const CHANGE_PASSWORD_FIELDS = {
    currentPassword: {
        name: 'currentPassword' as const,
        placeholder: 'Current password',
        type: 'password' as const,
    },
    newPassword: {
        name: 'newPassword' as const,
        placeholder: 'New password',
        type: 'password' as const,
    },
    confirmPassword: {
        name: 'confirmPassword' as const,
        placeholder: 'Confirm new password',
        type: 'password' as const,
    },
};
