import Cookies from "js-cookie"
export const storeAccessToken = (accessToken) => {
    console.log(accessToken)

    // document.cookie = `accesToken=${JSON.stringify(accesTokenObj)}}`
    Cookies.set("accessToken", accessToken, { expires: 7 })
        // console.log("acces token stored")
}

export const storeRefreshToken = (refreshToken, info) => {
    Cookies.set("refreshToken", refreshToken, { expires: 30 })
    Cookies.set("userInfo", JSON.stringify(info), { expires: 30 })

    // window.localStorage.setItem("userInfo", JSON.stringify(info))
    // console.log("refresh token stores")
}

export function deleteTokens() {
    Cookies.remove("accessToken")
    Cookies.remove("refreshToken")
    Cookies.remove("userInfo")
}

export async function getAccessToken() {
    // const accesTokenstring
    // console.log("getting cookies wait")
    var accessToken = Cookies.get("accessToken")
        // console.log(accesTokenObj)
        // console.log(accesTokenObj)

    // if (!cookies) {
    //     return null
    // }
    // const cookiesParsed = JSON.parse(cookies)
    if (!accessToken) {
        accessToken = await refreshToken()
        return accessToken
    } else {
        // console.log(cookies)

        return accessToken
    }
}

export async function refreshToken() {
    const refreshToken = Cookies.get("refreshToken")
    if (!refreshToken) return null
    console.log(refreshToken)
    const res = await fetch(`${info.baseUrl}/refresh_token`, {
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${refreshToken}`,
        },
    })
    const data = await res.json()

    storeAccessToken(data.access_token)
    return data.access_token
}

export function getUserInfo() {
    const userInfo = Cookies.get("userInfo")
    if (!userInfo) {
        return null
    }
    return JSON.parse(userInfo)
}

export const info = {
    baseUrl: `https://web-production-7e33.up.railway.app`,
}

export function getDateInfo(dateToFormat) {
    const date = new Date()
    const comment_date = new Date(dateToFormat)
    const diffTime = date - comment_date
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    console.log(diffDays)
    if (diffDays > 30) {
        return `${Math.floor(diffDays / 30)}mo ago`
    }
    if (diffDays < 1 && diffHours >= 1) {
        return `${Math.floor(diffTime / 1000 / 60 / 60)}h ago`
    }
    if (diffHours < 1) {
        return `${Math.floor(diffTime / 1000 / 60)} min ago`
    } else {
        return `${diffDays}d ago`
    }
}