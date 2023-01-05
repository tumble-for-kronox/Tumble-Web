export default class AvailableUserEvent {
    id: string
    title: string
    type: string
    eventStart: Date
    eventEnd: Date
    lastSignupDate: Date
    participatorId: string
    supportId: string
    anonymousCode: string
    isRegistered: boolean
    supportAvailable: boolean
    requiresChoosingLocation: boolean

    constructor(
        id: string,
        title: string,
        type: string,
        eventStart: Date,
        eventEnd: Date,
        lastSignupDate: Date,
        participatorId: string,
        supportId: string,
        anonymousCode: string,
        isRegistered: boolean,
        supportAvailable: boolean,
        requiresChoosingLocation: boolean
    ) {
        this.id = id
        this.title = title
        this.type = type
        this.eventStart = eventStart
        this.eventEnd = eventEnd
        this.lastSignupDate = lastSignupDate
        this.participatorId = participatorId
        this.supportId = supportId
        this.anonymousCode = anonymousCode
        this.isRegistered = isRegistered
        this.supportAvailable = supportAvailable
        this.requiresChoosingLocation = requiresChoosingLocation
    }
}