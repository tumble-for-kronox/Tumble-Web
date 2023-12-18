import SessionDetails from '../web/sessionDetails';

export default class KronoxUser {
    name: string;
    username: string;
    refreshToken: string;
    sessionDetails: SessionDetails;

    constructor(name: string, username: string, refreshToken: string, sessionDetails: SessionDetails) {
        this.name = name;
        this.username = username;
        this.refreshToken = refreshToken;
        this.sessionDetails = sessionDetails;
    }

    public static fromJson(json: any): KronoxUser {
        return new KronoxUser(json['name'], json['username'], json['refreshToken'], json['sessionDetails']);
    }
}
