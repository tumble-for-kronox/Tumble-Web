export default class KronoxUser {
    name: string
    username: string
    sessionToken: string
    refreshToken: string

    constructor(name: string, username: string, sessionToken: string, refreshToken: string) {
        this.name = name
        this.username = username
        this.sessionToken = sessionToken,
            this.refreshToken = refreshToken
    }
}