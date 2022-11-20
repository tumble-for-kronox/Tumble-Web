import Day from "./day"

export default class Schedule {
    cachedAt: Date
    id: string
    days: Day[]

    constructor(
        cachedAt: Date,
        id: string,
        days: Day[],
    ) {
        this.cachedAt = cachedAt
        this.id = id
        this.days = days
    }
}