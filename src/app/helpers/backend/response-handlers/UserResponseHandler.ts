import { HttpResponse } from "@angular/common/http";
import KronoxUser from "src/app/models/user/kronox_user";

export class UserResponseHandler {
    public parseLogin(result: HttpResponse<Object>): BackendResponse<KronoxUser | null> {
        if (!result.ok) {
            switch (result.status) {
                case 401:
                    return BackendResponse.Error('errors.login.401');
                case 404:
                    return BackendResponse.Error('errors.login.404');
                default:
                    return BackendResponse.Error('errors.500');
            }
        }

        return BackendResponse.Success(result.body as KronoxUser)
    }
}