export type Register = {
    name: string,
    email: string,
    password: string,
}

export type Login = {
    email: string,
    password: string
}

export type Logout = {
    refreshToken: string
}

export type RefreshToken = {
    refreshToken: string
}

export type ForgotPassword = {
    email: string
}

export type ResetPassword = {
    token: string
}

export type VerifyEmail = {
    token: string
}

