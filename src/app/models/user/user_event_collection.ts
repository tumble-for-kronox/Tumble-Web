import AvailableUserEvent from "./available_user_event";
import UpcomingUserEvent from "./upcoming_user_event";

export default class UserEventCollection {
    upcomingEvents: UpcomingUserEvent[]
    registeredEvents: AvailableUserEvent[]
    availableEvents: AvailableUserEvent[]

    constructor(upcomingEvents: UpcomingUserEvent[], registeredEvents: AvailableUserEvent[], availableEvents: AvailableUserEvent[]) {
        this.availableEvents = availableEvents
        this.upcomingEvents = upcomingEvents
        this.registeredEvents = registeredEvents
    }
}