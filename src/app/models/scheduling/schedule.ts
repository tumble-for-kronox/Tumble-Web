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
}