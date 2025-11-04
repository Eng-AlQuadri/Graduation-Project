import { Pagination } from "../Interfaces/Pagination";

export class PaginatedResult<T> {
  result!: T;
  pagination!: Pagination;
}
