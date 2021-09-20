import { AggregateRoot } from '@nestjs/cqrs';
import { IItemInterface } from './item.interface';
import { OrderEventSuccess, OrderEventFail } from '../order/order.events';
export class ItemModel extends AggregateRoot {
  constructor(private readonly item: IItemInterface) {
    super();
  }
  orderOnItem(orderTransactionGUID: string, userID: string, amount: number) {
    try {
      this.apply(
        new OrderEventSuccess(orderTransactionGUID, this.item.id, amount, {
          email: 'iman@chargoon.com',
          id: userID,
        }),
      );
    } catch (e) {
      this.apply(new OrderEventFail(orderTransactionGUID, e));
    }
  }
}
