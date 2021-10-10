export class BaseResponse<T> {

    public page: any;
    public data: T;
    public success: boolean;
    public message: string;
    public errors: any[] = [];

    constructor(response?: any) {
        if (response) {
            this.page = response.page;
            this.data = response.data;
            this.success = response.success;
            this.message = response.message;
            this.errors = response.errors;
        }
    }
}
