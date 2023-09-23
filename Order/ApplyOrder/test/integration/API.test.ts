import knexConnection from "@/infra/database/knexfile";
import axios from "axios";
import knexClear from "knex-cleaner";
let applyOrderInput = {
    documentTo: "81307907008",
    documentFrom: "85878184656",
    items: [
        {
            productId: "a3ff22d2-4e54-4db4-ae87-9e739f578009",
            quantity: 1,
        },
        {
            productId: "e0907ecf-3b90-4bbf-b741-ad3da998b59e",
            quantity: 2,
        },
        {
            productId: "3faccc5e-ab42-405e-b75e-45fba9c920cd",
            quantity: 4,
        },
    ],
};

async function sleep(time: number = 300) {
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(undefined);
        }, time);
    });
}

beforeEach(async () => {
    await knexClear.clean(knexConnection, {
        mode: "delete",
        restartIdentity: true,
        ignoreTables: ["product"],
    });
});

test("Deve ser possível aplicar para um pedido (checkout)", async function () {
    await axios.post("http://localhost:3002/applyOrder", applyOrderInput);
    await sleep();
    const document = "81307907008";
    const response = await axios.get(`http://localhost:3002/getOrder/${document}`);
    const output = response.data;
    expect(output.orderCode).toBe("202300000001");
    expect(output.document).toBe("81307907008");
    expect(output.orderStatus).toBe("open");
    expect(output.totalPrice).toBe(7152);
});
