export interface IPaginatedResource<T> {
  pageCount: number;
  page: number;
  pageSize: number;
  items: T[];
  itemsCount: number;
  total: number;
}

export type ITree<T> = ITreeNode<T>[];

export interface ITreeNode<T> {
  value: T;
  children: ITreeNode<T>[];
}
