import { RentalService } from "@/application/services/RentalService";
import { HttpServer } from "../http/HttpServer";

export class RestController {
    constructor(httpServer: HttpServer, rentalCarService: RentalService) {
        httpServer.on("post", "/rentals", async (body, params) => {
            await rentalCarService.rent(body as any);
        });
        httpServer.on("get", "/rental/:id", async (body, params) => {
            const output = await rentalCarService.getRental(params.id);
            return output;
        });
    }
}
