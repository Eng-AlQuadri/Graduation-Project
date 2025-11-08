export interface Pagination<T> {
  pageIndex: number;
  pageSize: number;
  count: number;
  items: T[];
}
