import axios from 'axios'

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
    const response = axios.post('http://172.23.112.1:8080/api/auth/register', body)
    return response
}

export async function createVerificationUser(body: IVerificationUserBody) {
    const response = axios.post('http://172.23.112.1:8080/api/auth/verification-code/confirm', body)
    return response
}

export async function resendVerificationCode(body: IResendCodeBody) {
    const response = axios.post('http://172.23.112.1:8080/api/auth/verification-code/resend', body)
    return response
}

export async function loginUser(body: IBodyLogin) {
    const response = await axios.post('http://172.23.112.1:8080/api/auth/login',body)
    return response
}

export async function logoutUser() {
    const response = await axios.post('http://172.23.112.1:8080/api/auth/logout')
    return response
}

