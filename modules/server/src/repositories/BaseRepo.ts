import { ConnectionProvider } from "src/datasources/ConnectionProvider";
import { DBConnection } from "src/datasources/DBConnection";
import { WithId } from "src/utils/types";

export abstract class BaseRepo {
  constructor(protected connectionProvider: ConnectionProvider) {}

  protected getConnection() {
    return this.connectionProvider.getConnection();
  }

  ensureTransaction<T>(
    conn: DBConnection | undefined,
    receiver: (conn: DBConnection) => Promise<T>
  ) {
    if (conn) return receiver(conn);
    conn = this.getConnection();
    return conn.transaction(() => {
      return receiver(conn!);
    });
  }

  withTransaction<T>(receiver: (conn: DBConnection) => Promise<T>) {
    return this.ensureTransaction<T>(undefined, receiver);
  }

  applyIds<TId, TSource extends { id: TId }, TTarget extends { id?: TId }>(
    sources: TSource[],
    targets: TTarget[]
  ): WithId<TTarget>[] {
    return targets.map((target, idx) => {
      target.id = sources[idx].id;
      return target as WithId<TTarget>;
    });
  }
}
