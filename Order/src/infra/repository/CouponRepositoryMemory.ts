import { CouponRepository } from "@/application/repository/CouponRepository";
import { Coupon } from "@/domain/entity/Coupon";

export class CouponRepositoryMemory implements CouponRepository {
    coupons: Map<string, Coupon> = new Map();

    static instance: CouponRepositoryMemory;

    static getInstance() {
        if (!CouponRepositoryMemory.instance) {
            CouponRepositoryMemory.instance = new CouponRepositoryMemory();
        }
        return CouponRepositoryMemory.instance;
    }
    async getByCode(couponCode: string): Promise<Coupon | null> {
        const coupon = this.coupons.get(couponCode);
        return coupon ?? null;
    }
    async persiste(coupon: Coupon): Promise<void> {
        this.coupons.set(coupon.getCode(), coupon);
    }
}
