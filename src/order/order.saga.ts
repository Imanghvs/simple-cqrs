import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { OrderEvent, OrderEventSuccess, OrderEventFail } from './order.events';
import { OrderCommand } from './order.commands';
@Injectable()
export class OrderSaga {
  @Saga()
  createOrder = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderEvent),
      map((event: OrderEvent) => {
        return new OrderCommand(
          event.orderTransactionGUID,
          event.orderUser,
          event.orderItem,
          event.orderAmount,
        );
      }),
    );
  };

  @Saga()
  createOrderSuccess = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderEventSuccess),
      mergeMap((event: OrderEventSuccess) => {
        console.log('Order Placed');
        return [];
      }),
    );
  };

  @Saga()
  createOrderFail = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderEventFail),
      mergeMap((event: OrderEventFail) => {
        console.log('Order Placing Failed');
        return [];
      }),
    );
  };
}
