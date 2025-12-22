import { apiPublic } from '@/api/api_public'

export type IBodyLogin = {
    username: string,
    password: string
}

export type IResendCodeBody = {
    username: string,
    destination: string
}

export type IVerificationUserBody = {
    code: string,
    destination: string
}


export async function createRegistration(body) {
    const response = apiPublic.post('/api/auth/register', body)
    return response
}

export async function createVerificationUser(body: IVerificationUserBody) {
    const response = apiPublic.post('/api/auth/verification-code/confirm', body)
    return response
}

export async function resendVerificationCode(body: IResendCodeBody) {
    const response = apiPublic.post('/api/auth/verification-code/resend', body)
    return response
}

export async function loginUser(body: IBodyLogin) {
    const response = await apiPublic.post('/api/auth/login',body)
    return response
}

export async function logoutUser() {
    const response = await apiPublic.post('/api/auth/logout')
    return response
}

