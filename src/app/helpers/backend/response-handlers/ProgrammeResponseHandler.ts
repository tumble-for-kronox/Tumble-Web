import { HttpResponse } from "@angular/common/http";
import Programme from "src/app/models/programme";
import { BackendResponse } from "../BackendResponse";

export class ProgrammeResponseHandler {
    public parseSearchResults(result: HttpResponse<Object>): BackendResponse<{ count: number, items: Programme[] } | null> {
        if (!result.ok) {
            switch (result.status) {
                case 400:
                    return BackendResponse.Error('errors.search.400');
                case 401:
                    return BackendResponse.Error('errors.search.401');
                default:
                    return BackendResponse.Error('errors.500');
            }
        }

        let searchResults = result.body as { count: number, items: Programme[] };
        if (result.status == 204) {
            searchResults = {
                count: 0,
                items: [],
            }
        }

        return BackendResponse.Success(searchResults);
    }
}