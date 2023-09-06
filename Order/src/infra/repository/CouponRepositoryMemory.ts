import { CouponRepository } from "@/application/repository/CouponRepository";
import { Coupon } from "@/domain/entity/Coupon";

export class CouponRepositoryMemory implements CouponRepository {
    coupons: Map<string, Coupon> = new Map();
    async getByCode(couponCode: string): Promise<Coupon | null> {
        const coupon = this.coupons.get(couponCode);
        return coupon ?? null;
    }
    async persiste(coupon: Coupon): Promise<void> {
        this.coupons.set(coupon.getCode(), coupon);
    }
}
