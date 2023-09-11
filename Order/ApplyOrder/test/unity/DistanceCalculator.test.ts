import { AppError } from "@/domain/entity/AppError";
import { DistanceCalculator } from "@/domain/entity/DistanceCalculator";

test("Deve ser possível calcular a distancia a partir de duas codemandas em KM", function () {
    const firstCoord = { lat: 40.7128, long: -74.006 };
    const secondCoord = { lat: 34.0522, long: -118.2437 };

    const distance = DistanceCalculator.execute(firstCoord, secondCoord);
    expect(distance).toBe(741);
});

test("Deve ser possível calcular a distancia a partir de duas codemandas em MILES", function () {
    const firstCoord = { lat: 40.7128, long: -74.006 };
    const secondCoord = { lat: 34.0522, long: -118.2437 };
    const distance = DistanceCalculator.execute(firstCoord, secondCoord, "miles");
    expect(distance).toBe(460);
});

test("Deve lançar um erro casso seja invalido a unidade de conversão.", function () {
    const firstCoord = { lat: 40.7128, long: -74.006 };
    const secondCoord = { lat: 34.0522, long: -118.2437 };
    expect(() => DistanceCalculator.execute(firstCoord, secondCoord, "invalid")).toThrow(new AppError("Invalid unit"));
});
