import { AddressRepository } from "../repository/AddressRepository";
import { CouponRepository } from "../repository/CouponRepository";
import { OrderRepository } from "../repository/OrderRepository";
import { ProductRepository } from "../repository/ProductRepository";

export interface OrderServiceFactory {
    orderRepository(): OrderRepository;
    couponRepository(): CouponRepository;
    productRepository(): ProductRepository;
    addressRepository(): AddressRepository;
}
