import { cloudname, uploadPreset } from "./cloudinaryConfig"

const baseUrl = `https://api.cloudinary.com/v1_1/${cloudname}`;

export const makeUploadRequest = ({ file,
    fieldName,
    progressCallback,
    successCallback,
    errorCallback,
}, logic) => {

    const url = `${baseUrl}/image/upload`;

    const formData = new FormData()
    formData.append(fieldName, file)
    formData.append("upload_preset", uploadPreset)
    const request = new XMLHttpRequest()

    request.open("POST", url)

    request.upload.onprogress = (e) => {
        progressCallback(e.lengthComputable, e.loaded, e.total)
    }

    request.onload = () => {
        if (request.status >= 200 && request.status < 300) {
            var responseInJSON = JSON.parse(request.response)
            const { delete_token: deletetoken } = responseInJSON
            logic(responseInJSON)
            successCallback(deletetoken)
        } else {
            errorCallback(request.responseText)
        }
    }
    request.send(formData)
    return () => {
        request.abort()
    }
}

export const makeDeleteRequest = ({ token,
    successCallback,
    errorCallback
}, deleteLogic) => {
    const url = `${baseUrl}/delete_by_token`;

    const request = new XMLHttpRequest()
    request.open("POST", url)
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = () => {
        if (request.status >= 200 && request.status < 300) {
            deleteLogic(token)
            successCallback()
        } else {
            errorCallback(request.responseText)
        }
    }
    request.send(JSON.stringify({ token }))
}
