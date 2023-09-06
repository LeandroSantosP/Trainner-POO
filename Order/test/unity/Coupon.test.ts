import { Coupon } from "@/domain/entity/Coupon";

test("Deve ser possível criar um cupom valido e obter o valor de discanto sobre 1000.", function () {
    const coupon = new Coupon("VALE50", 50);
    expect(coupon.getCode()).toBe("VALE50");
    expect(coupon.getDiscount(1000)).toBe(500);
});

test("Não deve ser possível validar de um coupon esta expirado ou nao", function () {
    const coupon = new Coupon("VALE50", 50, new Date("2023-06-01"));
    expect(coupon.isValid(new Date("2023-05-01"))).toBeTruthy();
    expect(coupon.isValid(new Date("2023-07-01"))).toBeFalsy();
});
