import { DataSource } from './datasource';

export abstract class Contract {
  constructor(protected dataSource: DataSource<any>) {}

  refreshEntity(entity: string) {
    this.dataSource.entity = entity;
  }
}
