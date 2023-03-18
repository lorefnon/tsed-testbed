import { PlatformTest } from "@tsed/common";
import { SqliteDatasource } from "./SqliteDatasource";

describe("SqliteDatasource", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it("should do something", () => {
    const instance = PlatformTest.get<SqliteDatasource>(SqliteDatasource);
    // const instance = PlatformTest.invoke<SqliteDatasource>(SqliteDatasource); // get fresh instance

    expect(instance).toBeInstanceOf(SqliteDatasource);
  });
});
