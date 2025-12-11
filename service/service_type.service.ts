import { apiPrivate } from "../api/api_private"

export async function  getAllServiceTypes() {
    const response = await apiPrivate.get('/service-type/all') 
    return response
}