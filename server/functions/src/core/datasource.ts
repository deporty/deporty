import { Observable } from "rxjs";

export interface DataSourceFilter {
  property: string;
  equals?: string;
}

export abstract class DataSource<T> {

  private _entity!: string;
  public get entity(): string {
    return this._entity;
  }
  public set entity(value: string) {
    this._entity = value;
  }


  abstract getById(id: string): Observable<T>;
  abstract getByFilter(filters: DataSourceFilter[]): Observable<T[]>;
  abstract deleteById(id: string): Observable<void>;
}
