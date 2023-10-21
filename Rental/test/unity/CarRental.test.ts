import { CarRental } from "@/domain/CarRental";
import { FakeClock } from "@/domain/FakeClock";

test("Deve criar um aluguel valido de um carro", function () {
    const clock = new FakeClock();
    clock.setCurrentTime(new Date("2023-06-21T10:00:00"));
    const carRent = CarRental.create({
        carPlate: "AAA-1111",
        carStatus: "available",
        clientId: "123",
        clock,
        rentalReturnDate: new Date("2023-06-22T12:00:00"),
    });

    expect(carRent.rentalReturnDate).toEqual(new Date("2023-06-22T12:00:00"));
    expect(carRent).toBeDefined();
    expect(carRent.getPlate()).toBe("AAA-1111");
    expect(carRent.period.getInHors()).toBe(26);
    expect(carRent.period.getInHors()).toBe(26);
});

test("Deve mudar o status para pagamento aprovado e rejeitado.", function () {
    const clock = new FakeClock();
    clock.setCurrentTime(new Date("2023-06-21T10:00:00"));
    const carRent = CarRental.create({
        carPlate: "AAA-1111",
        carStatus: "available",
        clientId: "123",
        clock,
        rentalReturnDate: new Date("2023-06-22T12:00:00"),
    });
    carRent.updateStatus().paymentAprove();
    expect(carRent.getStatus()).toBe("payment_aprove");
    carRent.updateStatus().paymentReject();
    expect(carRent.getStatus()).toBe("payment_reject");
});

test("Deve calcular o preço inicial do aluguel com taxa de 10 por hora", function () {
    const clock = new FakeClock();
    clock.setCurrentTime(new Date("2023-06-21T10:00:00"));
    const carRent = CarRental.create({
        carPlate: "AAA-1111",
        carStatus: "available",
        clientId: "123",
        clock,
        rentalReturnDate: new Date("2023-06-22T12:00:00"),
    });
    const price = carRent.getPrice();
    expect(price).toBe(260);
});

test("Deve finalizar o aluguel e calcular o total.", function () {
    const clock = new FakeClock();
    clock.setCurrentTime(new Date("2023-06-21T10:00:00"));
    const carRent = CarRental.create({
        carPlate: "AAA-1111",
        carStatus: "available",
        clientId: "123",
        clock,
        rentalReturnDate: new Date("2023-06-22T12:00:00"),
    });
    clock.setCurrentTime(new Date("2023-06-22T12:00:00"));
    const { totalPrice, penaltyFare } = carRent.finishedRent();
    expect(totalPrice).toBe(260);
    expect(penaltyFare).toBe(0);
});

test("Deve calcular o preço com multa de 15 por hora.", function () {
    const clock = new FakeClock();
    clock.setCurrentTime(new Date("2023-06-21T10:00:00"));
    const carRent = CarRental.create({
        carPlate: "AAA-1111",
        carStatus: "available",
        clientId: "123",
        clock,
        rentalReturnDate: new Date("2023-06-22T12:00:00"),
    });
    clock.setCurrentTime(new Date("2023-06-22T14:00:00"));
    const { totalPrice, penaltyFare } = carRent.finishedRent();
    expect(totalPrice).toBe(290);
    expect(penaltyFare).toBe(30);
});
