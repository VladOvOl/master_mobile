import { apiPrivate } from "../api/api_private"

export async function createDraftPhoto(body) {
    const response = apiPrivate.post('/api/photo', body, {
        headers: { "Content-Type": "multipart/form-data" }
    })
    return response
}

export async function getPhotoById(param:string) {
    const response = apiPrivate.get(`/api/photo/${param}`,{
                responseType: "arraybuffer",
            })
    return response
}