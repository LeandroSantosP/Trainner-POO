import { RentalService } from "@/application/services/RentalService";
import { HttpServer } from "./HttpServer";

export class RestController {
    constructor(httpServer: HttpServer, rentalCarService: RentalService) {
        httpServer.on("post", "/rentals", async (cpx) => {
            try {
                await rentalCarService.rent(cpx.body as any);
                cpx.set.status = 201;
                return;
            } catch (error: any) {
                cpx.set.status = 500;
                console.log(error);
                return {
                    message: "Internal server error.",
                    error: error.message,
                };
            }
        });
        httpServer.on("get", "/rental/:id", async (cpx) => {
            try {
                const output = await rentalCarService.getRental(cpx.params.id);
                cpx.set.status = 201;
                return output;
            } catch (error: any) {
                cpx.set.status = 500;
                console.log(error);
                return {
                    message: "Internal server error.",
                    error: error.message,
                };
            }
        });
        // httpServer.listen(3000, (hostname: string, port: number) => {
        //     console.log(`Running at http://${hostname}:${port}`);
        // });
    }
}
