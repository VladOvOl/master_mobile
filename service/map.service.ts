import { apiPrivate } from "../api/api_private"

export async function getAllAidPoints() {
    const response = await apiPrivate.get('/aid-point/get-all-within-range?latitude=48.86562972143917&longitude=9.198339685072098&range=1000')
    return response
}

export async function getAidPoint(param:string) {
    const response = await apiPrivate.get(`/aid-point/${param}`)
    return response
}

export async function createAidPoint(body) {
    const response = await apiPrivate.post('/aid-point',body)
    return response
}