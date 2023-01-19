import { AvailabilityEnum } from "../enums/availability"

export default class AvailabilitySlot {
    availability: AvailabilityEnum
    locationId?: string
    resourceType?: string
    timeSlotId?: string
    bookedBy?: string

    constructor(
        availability: AvailabilityEnum,
        locationId?: string,
        resourceType?: string,
        timeSlotId?: string,
        bookedBy?: string,
    ) {
        this.availability = availability
        this.locationId = locationId
        this.resourceType = resourceType
        this.timeSlotId = timeSlotId
        this.bookedBy = bookedBy
    }
}