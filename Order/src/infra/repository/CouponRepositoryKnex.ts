import { CouponRepository } from "@/application/repository/CouponRepository";
import { Coupon } from "../../domain/entity/Coupon";
import knexConnection from "../database/knexfile";
import { Knex } from "knex";

export class CouponRepositoryKnex implements CouponRepository {
    app: Knex;
    constructor() {
        this.app = knexConnection;
    }
    async persiste(coupon: Coupon): Promise<void> {
        await this.app("coupon").insert({
            code: coupon.getCode(),
            percentage: coupon.percentage,
            expire_date: coupon.expire_date,
        });
    }
    async getByCode(couponCode: string): Promise<Coupon | null> {
        const [couponData] = await this.app("coupon").where("coupon.code", couponCode);
        return new Coupon(couponData.code, couponData.percentage, couponData.expire_date) ?? null;
    }

    async close() {
        await this.app.destroy();
    }
}
