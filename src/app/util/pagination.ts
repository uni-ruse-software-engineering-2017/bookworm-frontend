import { IPaginatedResource } from "../core/types";

export function emptyResource<T>() {
  const resource: IPaginatedResource<T> = {
    items: [],
    itemsCount: 0,
    page: 1,
    pageCount: 1,
    pageSize: 25,
    total: 0
  };

  return resource;
}

export function defaultPaginationQuery(): IPaginationQuery {
  return {
    pageSize: 10,
    page: 1,
    search: ""
  };
}

export function buildQueryParamsFromPagination(
  pagination: IPaginationQuery
): { [key: string]: any } {
  const p = pagination || defaultPaginationQuery();
  const result: { [key: string]: any } = {
    page_size: p.pageSize,
    page: p.page
  };

  if (p.search) {
    result.q = p.search;
  }

  return result;
}

export interface IPaginationQuery {
  pageSize: number;
  page: number;
  search?: string;
}
