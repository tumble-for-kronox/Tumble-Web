import { BackendResponse } from "../BackendResponse";

export class ScheduleResponseHandler {
    public parseScheduleFetchError(err: any): BackendResponse<null> {
        switch (err.status) {
            case 400:
                return BackendResponse.Error('errors.schedules.400')
            case 401:
                return BackendResponse.Error('errors.schedules.401')
            case 404:
                return BackendResponse.Error('errors.schedules.404')
            default:
                return BackendResponse.Error('errors.500')
        }
    }
}