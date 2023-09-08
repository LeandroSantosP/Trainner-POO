import { Coupon } from "@/domain/entity/Coupon";

export interface CouponRepository {
    persiste(coupon: Coupon): Promise<void>;
    getByCode(couponCode: string): Promise<Coupon | null>;
}
