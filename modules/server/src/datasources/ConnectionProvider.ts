import { Service } from "@tsed/di";
import Sqlite3 from "better-sqlite3";
import { BetterSqlite3QueryRunner } from "ts-sql-query/queryRunners/BetterSqlite3QueryRunner";
import { ConsoleLogQueryRunner } from "ts-sql-query/queryRunners/ConsoleLogQueryRunner";
import { DBConnection } from "./DBConnection";

@Service()
export class ConnectionProvider {
  private db = Sqlite3(process.env.DB_PATH!);

  getConnection() {
    return new DBConnection(
      new ConsoleLogQueryRunner(new BetterSqlite3QueryRunner(this.db), {
        logResults: process.env.NODE_ENV === "production",
        logTimestamps: true,
        logDurations: true,
      })
    );
  }
}
