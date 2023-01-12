export default class KronoxUser {
    name: string
    username: string
    refreshToken: string

    constructor(name: string, username: string, refreshToken: string) {
        this.name = name
        this.username = username
        this.refreshToken = refreshToken
    }
}