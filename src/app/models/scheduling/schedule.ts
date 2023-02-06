import Day from "./day"

export default class Schedule {
    cachedAt: Date
    ids: string[]
    days: Day[]

    constructor(
        cachedAt: Date,
        ids: string[],
        days: Day[],
    ) {
        this.cachedAt = cachedAt
        this.ids = ids
        this.days = days
    }

    static fromJson(json: any): Schedule {
        return new Schedule(
            new Date(json['cachedAt']),
            json['ids'],
            json['days'].map((value: any) => Day.fromJson(value))
        )
    }
}