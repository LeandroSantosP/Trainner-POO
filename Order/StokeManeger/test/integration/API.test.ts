import axios from "axios";
test.skip("Deve testar a API", async function () {
    const response = await axios.get("http://localhost:3001/products", {
        params: {
            productIds: JSON.stringify([
                "e0907ecf-3b90-4bbf-b741-ad3da998b59e",
                "3faccc5e-ab42-405e-b75e-45fba9c920cd",
                "3faccc5e-ab42-405e-b75e-45fba9c920cd",
            ]),
        },
    });
    const output = response.data;
    expect(output.products).toHaveLength(3);
});
