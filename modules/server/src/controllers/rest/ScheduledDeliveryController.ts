import { Controller } from "@tsed/di";
import { BadRequest } from "@tsed/exceptions";
import { parse } from "date-fns";
import { BodyParams, QueryParams } from "@tsed/platform-params";
import { Get, Post, Property, Put, Returns } from "@tsed/schema";

import { ScheduledDelivery } from "src/entities/ScheduledDelivery";
import { ScheduledDeliveryRepo } from "src/repositories/ScheduledDeliveryRepo";

class ScheduledDeliveryPayload {
  @Property()
  entity: ScheduledDelivery;
}

class ScheduledDeliveryListPayload {
  @Property(ScheduledDelivery)
  entities: ScheduledDelivery[];
}

@Controller("/scheduled-deliveries")
export class ScheduledDeliveryController {
  constructor(private scheduledDeliveryRepo: ScheduledDeliveryRepo) {}

  @Put("/")
  @Returns(200, ScheduledDeliveryPayload)
  async upsertOne(@BodyParams() { entity }: ScheduledDeliveryPayload) {
    if (entity.id) {
      await this.scheduledDeliveryRepo.updateOne(entity);
    } else {
      await this.scheduledDeliveryRepo.insertOne(entity);
    }
    return { entity };
  }

  @Get("/")
  @Returns(200, ScheduledDeliveryListPayload)
  async findByDate(
    @QueryParams("date") date?: string
  ): Promise<ScheduledDeliveryListPayload> {
    if (!date) {
      throw new BadRequest("data parameter is required");
    }
    let nDate: Date;
    try {
      nDate = this.normalizeDateParam(date);
    } catch (e) {
      throw new BadRequest("invalid date format provided");
    }
    const entities = await this.scheduledDeliveryRepo.findByArrivalDate(nDate);
    return { entities };
  }

  private normalizeDateParam(date: string) {
    const now = new Date();
    if (date === "$today") {
      return now;
    }
    return parse(date, "yyyy-MM-dd", now);
  }
}
