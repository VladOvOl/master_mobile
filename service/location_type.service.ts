import { apiPrivate } from "../api/api_private";

export async function getAllLocationTypes() {
    const response = await apiPrivate.get('/location-type/all') 
    return response
}