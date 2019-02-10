export interface IPaginatedResource<T> {
  pageCount: number;
  page: number;
  pageSize: number;
  items: T[];
  itemsCount: number;
  total: number;
}

export interface IPaginationQuery {
  page?: number;
  pageSize?: number;
}
