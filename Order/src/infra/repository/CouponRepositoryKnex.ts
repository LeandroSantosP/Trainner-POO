import { CouponRepository } from "@/application/repository/CouponRepository";
import { Coupon } from "@/domain/entity/Coupon";
import knexConnection from "../database/knexfile";
import { Knex } from "knex";

export class CouponRepositoryKnex implements CouponRepository {
    app: Knex;
    constructor() {
        this.app = knexConnection;
    }
    async persiste(coupon: Coupon): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async getByCode(couponCode: string): Promise<Coupon | null> {
        throw new Error("Method not implemented.");
    }
}
