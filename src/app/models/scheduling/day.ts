import Event from "./event"

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

    static fromJson(json: any): Day {
        return new Day(
            json['name'],
            json['date'],
            new Date(json['isoString']),
            json['weekNumber'],
            json['events'].map((value: any) => Event.fromJson(value))
        )
    }
}