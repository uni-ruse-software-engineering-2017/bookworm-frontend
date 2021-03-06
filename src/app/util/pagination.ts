import { IPaginatedResource } from "../core/types";

export function emptyResource<T>() {
  const resource: IPaginatedResource<T> = {
    items: [],
    itemsCount: 0,
    page: 1,
    pageCount: 1,
    pageSize: 10,
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
    page_size: p.pageSize || 10,
    page: p.page || 1
  };

  if (p.search) {
    result.q = p.search;
  }

  if (p.sortBy) {
    result.sort_by = p.sortBy;
  }

  if (p.sortOrder) {
    result.sort_order = p.sortOrder;
  }

  return result;
}

export interface IPaginationQuery {
  pageSize?: number;
  page: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
}
