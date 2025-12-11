import { apiPrivate } from "../api/api_private"


export async function getUserInfo() {
    const response = await apiPrivate.get('/user/me')
    return response
}

export async function changeUserName(body) {
    const response = await apiPrivate.post('/user/me/change-username',body)
    return response
}

export async function changeUserEmail(body) {
    const response = await apiPrivate.post('/user/me/change-email',body)
    return response
}

export async function changeUserPhoneNumber(body) {
    const response = await apiPrivate.post('/user/me/change-phone-number',body)
    return response
}

export async function changeUserPassword (body) {
    const response = await apiPrivate.post('/user/me/change-password',body)
    return response
}