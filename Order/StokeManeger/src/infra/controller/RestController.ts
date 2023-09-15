import { httpServer } from "../http/httpServer";
import { StokeService } from "@/application/services/StokeService";

export class RestController {
    constructor(httpServer: httpServer, stokeService: StokeService) {}
}
