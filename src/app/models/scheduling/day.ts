export default class Day {
    name: string
    date: string
    isoString: Date
    weekNumber: number
    events: Event[]

    constructor(
        name: string,
        date: string,
        isoString: Date,
        weekNumber: number,
        events: Event[],
    ) {
        this.name = name
        this.date = date
        this.isoString = isoString
        this.weekNumber = weekNumber
        this.events = events
    }
}