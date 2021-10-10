export class Pagination {
    public pageSize: number;
    public pageNumber: number;
    public sortBy: string;
    public sortDirection: string;

    constructor(options?: any) {
        this.pageSize = (options && options.pageSize) ? options.pageSize : 25;
        this.pageNumber = (options && options.pageNumber) ? options.pageNumber : 1;
        this.sortBy = (options && options.sortBy) ? options.sortBy : 'createdAt';
        this.sortDirection = (options && options.sortDirection) ? options.sortDirection : 'ASC';
    }
}
