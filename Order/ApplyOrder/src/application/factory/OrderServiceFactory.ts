import { AddressRepository } from "../repository/AddressRepository";
import { CouponRepository } from "../repository/CouponRepository";
import { MessageRepository } from "../repository/MessageRepository";
import { OrderRepository } from "../repository/OrderRepository";

export interface OrderServiceFactory {
    messageRepository(): MessageRepository;
    orderRepository(): OrderRepository;
    couponRepository(): CouponRepository;
    addressRepository(): AddressRepository;
}
