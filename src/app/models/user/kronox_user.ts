export default class KronoxUser {
    name: string
    username: string
    sessionToken: string

    constructor(name: string, username: string, sessionToken: string) {
        this.name = name
        this.username = username
        this.sessionToken = sessionToken
    }
}