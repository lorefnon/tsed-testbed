import { ConnectionProvider } from "src/datasources/ConnectionProvider";
import { DBConnection } from "src/datasources/DBConnection";

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
}
