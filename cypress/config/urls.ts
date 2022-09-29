export const requestUrls = {
    REGISTER:'/register',

} as const

export const syliusUrls = {
    FORGOTTEN_PASSWORD: '/forgotten-password',
    LOGIN: '/login',
    ACCOUNT: '/account/dashboard',
    ACCOUNT_EDIT: '/account/profile/edit',
    HOMEPAGE:'/',
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