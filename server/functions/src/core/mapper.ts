export abstract class Mapper<T> {
  abstract fromJson(obj: any): T;
  abstract fromJsonWithOutId(obj: any): Omit<T, 'id'>;
  abstract toJson(player: T): any;
}
