export class BackendResponse<T> {
    static Success = <T>(
        data: T
    ) => {
        return new BackendResponse<T>(
            BackendResponseStatus.SUCCESS,
            {
                data: data
            }
        )
    }

    static Error = (
        errorMessage: string
    ) => {
        return new BackendResponse<null>(
            BackendResponseStatus.ERROR,
            {
                error: Error(errorMessage)
            }
        )
    }

    status: BackendResponseStatus
    data?: T
    error?: Error

    private constructor(
        status: BackendResponseStatus,
        {
            data,
            error
        }: {
            data?: T,
            error?: Error
        }
    ) {
        this.status = status
        this.data = data
        this.error = error
    }
}

export enum BackendResponseStatus {
    SUCCESS,
    ERROR
}
