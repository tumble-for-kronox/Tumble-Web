import { Course, Teacher, Location } from "./misc"

export default class Event {
    id: string
    scheduleIds: string[]
    title: string
    course: Course
    from: Date
    to: Date
    locations: Location[]
    teachers: Teacher[]
    isSpecial: boolean
    lastModified: Date

    constructor(
        id: string,
        scheduleIds: string[],
        title: string,
        course: Course,
        from: Date,
        to: Date,
        locations: Location[],
        teachers: Teacher[],
        isSpecial: boolean,
        lastModified: Date,
    ) {
        this.id = id
        this.scheduleIds = scheduleIds
        this.title = title
        this.course = course
        this.from = from
        this.to = to
        this.locations = locations
        this.teachers = teachers
        this.isSpecial = isSpecial
        this.lastModified = lastModified
    }
}