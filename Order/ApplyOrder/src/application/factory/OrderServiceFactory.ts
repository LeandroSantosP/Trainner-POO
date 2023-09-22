import { AddressRepository } from "../repository/AddressRepository";
import { CouponRepository } from "../repository/CouponRepository";
import { OrderRepository } from "../repository/OrderRepository";

export interface OrderServiceFactory {
    orderRepository(): OrderRepository;
    couponRepository(): CouponRepository;
    addressRepository(): AddressRepository;
}
