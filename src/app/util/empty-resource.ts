import { IPaginatedResource } from "../core/types";

export default function emptyResource<T>() {
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
