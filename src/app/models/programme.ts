export default class Programme {
    id: string
    title: string
    subtitle: string

    constructor(id: string, title: string, subtitle: string) {
        this.id = id
        this.title = title
        this.subtitle = subtitle
    }

    public static fromJson(json: any): Programme {
        return new Programme(json['id'], json['title'], json['subtitle']);
    }
}