export default class UpcomingUserEvent {
    title: string
    type: string
    eventStart: Date
    eventEnd: Date
    firstSignupDate: Date

    constructor(title: string, type: string, eventStart: Date, eventEnd: Date, firstSignupDate: Date) {
        this.title = title
        this.type = type
        this.eventStart = eventStart
        this.eventEnd = eventEnd
        this.firstSignupDate = firstSignupDate
    }
}