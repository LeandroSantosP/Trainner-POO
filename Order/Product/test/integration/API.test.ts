import axios from "axios";
test("Deve testar a API", async function () {
    const response = await axios.get("http://localhost:3001/products", {
        params: {
            productIds: JSON.stringify(["123", "124", "125"]),
        },
    });
    const output = response.data;
    expect(output.products).toHaveLength(3);
});
