export const clientUrls = {

} as const

export const syliusUrls = {
    FORGOTTEN_PASSWORD: '/forgotten-password',
    LOGIN: '/login',
} as const

export const urls = {
    clientUrls: {
        clientUrls
    },
    syliusUrls: {
        ...syliusUrls
    }
}