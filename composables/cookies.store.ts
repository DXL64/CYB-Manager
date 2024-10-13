"use client"
import Cookies from 'js-cookie'

const CookieStore = {
    set(name: string, value: string) {
        Cookies.set(name, value)
    },

    get(name: string) {
        Cookies.get(name)
    },

    setAuth(value: string) {
        Cookies.set('auth_token', value)
    },

    getAuth() {
        Cookies.get('auth_token')
    },
    
    getRefreshToken() {
        Cookies.get('refresh_token')
    },

    setRefreshToken(value: string) {
        Cookies.set('refresh_token', value)
    }
}

export default CookieStore