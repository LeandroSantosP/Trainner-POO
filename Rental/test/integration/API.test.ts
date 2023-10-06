import axios from "axios";

test("Must be possible make a car rental", async function () {
    const input = {
        client_id: "111222333",
        plate: "AAA-3344",
        return_rental_date: new Date("2024-06-21T10:00:00"),
    };
    await axios.post("http://localhost:3000/rentals", input);
    const response = await axios.get("http://localhost:3000/rental/" + input.client_id);

    const output = response.data;

    expect(output.status).toBe("waiting_payment");
    expect(output.car_plate).toBe("AAA-3344");
    expect(output.rental_date_end).toBeUndefined();
    expect(output.rental_return_date).toEqual("2024-06-21T13:00:00.000Z");
    expect(output.rentalPeriod).toBe(258);
    expect(output.currentPrice).toBe(62070);
});
