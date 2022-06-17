import { DataSource } from '../core/datasource';
import { Container } from '../core/DI';
import { FirebaseDataSource } from '../core/firebase.datasource';
import { FirebaseDatabaseMock } from './firebase-datasource.mock';

export function buildContainer(entitiesModuleConfig: any): Container {
  const container = new Container();

  container.addValue({
    id: 'FirebaseDatabase',
    value: new FirebaseDatabaseMock(),
  });
  container.add({
    id: 'DataSource',
    kind: DataSource,
    strategy: 'singleton',
    dependencies: ['FirebaseDatabase'],
    override: FirebaseDataSource,
  });
  entitiesModuleConfig.config(container);
  return container;
}