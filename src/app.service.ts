import { Injectable } from '@nestjs/common';
import { EventBus, QueryBus } from '@nestjs/cqrs';
import { v4 as uuid } from 'uuid';

import { OrderEvent } from './order/order.events';

@Injectable()
export class AppService {
  constructor(
    private readonly eventBus: EventBus,
    private queryBus: QueryBus,
  ) {}

  async bid(): Promise<Record<string, any>> {
    const orderTransactionGUID = uuid();
    this.eventBus.publish(
      new OrderEvent(orderTransactionGUID, 'Iman Ghavasieh', 'Pizza', 50000),
    );
    return { status: 'pending' };
  }
}
