import AvailableUserEvent from "./available_user_event";

export default class MutliRegistrationResult {
    successfulRegistrations: AvailableUserEvent[]
    failedRegistrations: AvailableUserEvent[]

    constructor(successfulRegistrations: AvailableUserEvent[], failedRegistrations: AvailableUserEvent[]) {
        this.successfulRegistrations = successfulRegistrations
        this.failedRegistrations = failedRegistrations
    }
}   