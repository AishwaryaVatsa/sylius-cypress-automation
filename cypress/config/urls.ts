export const networkUrls = {

} as const

export const syliusUrls = {
    FORGOTTEN_PASSWORD: '/forgotten-password',
    LOGIN: '/login',
    ACCOUNT: '/account/dashboard',
    ACCOUNT_EDIT: '/account/profile/edit',
    HOMEPAGE:'/'
} as const

export const urls = {
    clientUrls: {
        ...networkUrls
    },
    syliusUrls: {
        ...syliusUrls
    }
}