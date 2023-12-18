export default class SessionDetails {
    sessionToken: string;
    sessionLocation: string;

    constructor(sessionToken: string, sessionLocation: string) {
        this.sessionToken = sessionToken;
        this.sessionLocation = sessionLocation;
    }

    public static fromJson(json: any): SessionDetails {
        return new SessionDetails(json['sessionToken'], json['sessionLocation']);
    }

    public toJson(): string {
        return JSON.stringify(this);
    }
}
