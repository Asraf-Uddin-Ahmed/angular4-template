
export class PaginationField {
    pageNumber: string;
    startOffset: string;
    itemsPerPage: string;

    hasPaginationField() {
        return (this.pageNumber || this.startOffset) && this.itemsPerPage;
    }
}