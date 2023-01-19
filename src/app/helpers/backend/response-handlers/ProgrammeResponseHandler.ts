import { HttpResponse } from "@angular/common/http";
import Programme from "src/app/models/programme";
import { BackendResponse } from "../BackendResponse";

export class ProgrammeResponseHandler {
    public parseSearchError(err: any): BackendResponse<null> {
        switch (err.status) {
            case 400:
                return BackendResponse.Error('errors.search.400');
            case 401:
                return BackendResponse.Error('errors.search.401');
            default:
                return BackendResponse.Error('errors.500');
        }
    }
}