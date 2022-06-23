export interface AddConfiguration {
  id: string;
  kind: any;
  override?: any;
  dependencies?: any[];
  strategy: 'singleton' | 'factory';
}

export interface AddValueConfiguration {
  id: string;
  value: any;
}

export interface SavedKindConfiguration {
  constructor: Function;
  instance: any;
}

export class Container {
  table: {
    [index: string]: SavedKindConfiguration;
  };
  constructor() {
    this.table = {};
  }

  getInstance<T>(id: string): T {
    const inst = this.table[id];
    if (!inst) {
      console.log('Id no encontrado', id);
    }
    return inst.instance as T;
  }

  getDependencies(dependenciesId: string[]) {
    const response: any[] = [];
    for (const dep of dependenciesId) {
      response.push(this.getInstance(dep));
    }
    return response;
  }
  add(config: AddConfiguration) {
    let typeClass = config.kind;
    if (config.override) {
      typeClass = config.override;
    }

    const params: ArrayLike<any> = this.getDependencies(
      config.dependencies || []
    );
    if (config.id === 'PlayerContract') {
    }
    const constructor = () => Reflect.construct(typeClass, params);

    this.table[config.id] = {
      constructor,
      instance: constructor(),
    };
  }

  addValue(config: AddValueConfiguration) {
    this.table[config.id] = {
      constructor: () => config.value,
      instance: config.value,
    };
  }
}
