import { Course, Teacher } from "./misc"

export default class Event {
    id: string
    title: string
    course: Course
    timeStart: Date
    timeEnd: Date
    locations: Location[]
    teachers: Teacher[]
    isSpecial: boolean
    lastModified: Date

    constructor(
        id: string,
        title: string,
        course: Course,
        timeStart: Date,
        timeEnd: Date,
        locations: Location[],
        teachers: Teacher[],
        isSpecial: boolean,
        lastModified: Date,
    ) {
        this.id = id
        this.title = title
        this.course = course
        this.timeStart = timeStart
        this.timeEnd = timeEnd
        this.locations = locations
        this.teachers = teachers
        this.isSpecial = isSpecial
        this.lastModified = lastModified
    }
}