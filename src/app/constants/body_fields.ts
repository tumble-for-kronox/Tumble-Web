import AvailabilitySlot from "../models/booking/availability_slot"

export default class BodyFields {
    static login = (username: string, password: string) => {
        return {
            'username': username,
            'password': password,
        }
    }

    static bookResource = (resourceId: string, date: Date, availabilitySlot: AvailabilitySlot) => {
        return {
            'resourceId': resourceId,
            'date': date,
            'availabilitySlot': availabilitySlot
        }
    }

    static submitIssue = (title: string, description: string) => {
        return {
            'title': title,
            'description': description
        }
    }
}