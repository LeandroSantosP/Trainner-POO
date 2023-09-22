import knexConnection from "@/infra/database/knexfile";
import axios from "axios";
import knexClear from "knex-cleaner";
import { sleep } from "../util/sleep";
import { AddressRepositoryKnex } from "@/infra/repository/AddressRepositoryKnex";
import { Address } from "@/domain/entity/Address";
let applyOrderInput = {
    documentTo: "77479815115",
    documentFrom: "58522540292",
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

beforeEach(async () => {
    await knexClear.clean(knexConnection, {
        mode: "delete",
        restartIdentity: true,
        ignoreTables: ["product"],
    });
    const addressRepository = new AddressRepositoryKnex();
    await addressRepository.save(new Address("77479815115", "", "", "", 40.7128, -74.006));
    await addressRepository.save(new Address("58522540292", "", "", "", 34.0522, -118.2437));
});

test("Deve ser possível aplicar para um pedido (checkout)", async function () {
    await axios.post("http://localhost:3002/applyOrder", applyOrderInput);
    await sleep(4000);
    const document = "77479815115";
    const response = await axios.get(`http://localhost:3002/getOrder/${document}`);
    const output = response.data;
    expect(output.orderCode).toBe("202300000001");
    expect(output.document).toBe("77479815115");
    expect(output.orderStatus).toBe("open");
    expect(output.totalPrice).toBe(7152);
});
