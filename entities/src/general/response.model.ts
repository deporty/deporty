export interface IBaseResponse<T> {
  meta: {
    code: string;
    message: string;
  };
  data: T;
}
