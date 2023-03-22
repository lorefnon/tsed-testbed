import { PlatformContext, PlatformTest } from "@tsed/common";
import SuperTest from "supertest";
import { ScheduledDeliveryController } from "./ScheduledDeliveryController";
import { Server } from "../../Server";
import { ScheduledDeliveryRepo } from "../../repositories/ScheduledDeliveryRepo";
import format from "date-fns/format";
import { addDays } from "date-fns";

describe("ScheduledDeliveryController", () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;

  beforeEach(PlatformTest.bootstrap(Server, {
    mount: {
      "/": [ScheduledDeliveryController]
    }
  }));
  beforeEach(() => {
    request = SuperTest(PlatformTest.callback());
  });

  afterEach(PlatformTest.reset);

  it("should support GET /scheduled-deliveries", async () => {
    const repo = PlatformTest.get<ScheduledDeliveryRepo>(ScheduledDeliveryRepo)
    const now = +new Date()
    const entity = await repo.insertOne({
      arrivalTime: now,
      foodCombo: {
        name: 'Chinese Platter',
        items: [{
          name: 'Khao Sui'
        }]
      }
    })
    const response = await request.get(`/scheduled-deliveries?date=${format(now, 'yyyy-MM-dd')}`).expect(200);
    expect(response.body.entities.find((it: any) => it.id === entity.id)).toBeTruthy()
  });

  it("should support POST /scheduled-deliveries", async () => {
    const date = addDays(+new Date(), 1)
    const response = await request
      .put("/scheduled-deliveries")
      .send({
        entity: {
          arrivalTime: +date,
          foodCombo: {
            name: 'Paneer Platter',
            items: [{
              name: 'Paneer Tikka'
            }]
          }
        }
      })
      .expect('Content-Type', /json/)
      .expect(200)
    expect(response.body.entity.arrivalTime).toEqual(+date)
  })
});

