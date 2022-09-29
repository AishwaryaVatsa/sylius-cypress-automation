export const requestUrls = {
    REGISTER: '/register',

} as const

export const syliusUrls = {
    ACCOUNT: '/account/dashboard',
    ACCOUNT_EDIT: '/account/profile/edit',
    FORGOTTEN_PASSWORD: '/forgotten-password',
    HOMEPAGE: '/',
    LOGIN: '/login',
    REGISTER: '/register'
} as const

export const urls = {
    clientUrls: {
        ...requestUrls
    },
    syliusUrls: {
        ...syliusUrls
    }
}

export default urls