import { CarRental } from "@/domain/CarRental";
import { Clock } from "../interfaces/Clock";
import { CarRepository } from "../repository/CarRepository";
import { CarRentRepository } from "../repository/CarRentRepository";
import { GetRentalOutput, PaymentRentalInput, RentInput } from "./CarServiceTypes";
import { PaymentGateway } from "../interfaces/PaymentGateway";
import { TransactionService } from "./TransactionService";

export class RentalService {
    clientDoc = "123456789";
    method = "boleto";
    constructor(
        readonly paymentGateway: PaymentGateway,
        readonly clock: Clock,
        readonly rentRepository: CarRentRepository,
        readonly carRepository: CarRepository,
        readonly transactionService: TransactionService
    ) {}

    async rent(input: RentInput): Promise<void> {
        const car = await this.carRepository.get(input.plate);

        const carRental = CarRental.create({
            carPlate: car.plate,
            clientId: input.client_id,
            clock: this.clock,
            carStatus: car.status,
            rentalReturnDate: new Date(input.return_rental_date),
        });

        await this.rentRepository.persiste(carRental);
    }

    async paymentRental(input: PaymentRentalInput) {
        const carRental = await this.rentRepository.get(input.carPlate);

        const { penaltyFare, totalPrice } = carRental.finishedRent();

        const output = await this.paymentGateway.pay({ amount: totalPrice, token: input.paymentToken });

        if (output.status === "paid") {
            carRental.updateStatus().paymentAprove();
            await this.transactionService.makeTransaction({
                amount: totalPrice,
                fare: penaltyFare,
                method: this.method,
                document: this.clientDoc,
            });
            await this.rentRepository.update(carRental);
        } else if (output.status === "rejected") {
            this.rentRepository.update(carRental);
            carRental.updateStatus().paymentReject();
        }
    }

    async getRental(client_id: string): Promise<GetRentalOutput> {
        const rental = await this.rentRepository.getByClientId(client_id);

        return {
            car_plate: rental.getPlate(),
            rental_date_end: undefined,
            rental_return_date: rental.rentalReturnDate,
            status: rental.getStatus(),
            rentalPeriod: rental.period.getInDays(),
            currentPrice: rental.getPrice(),
        };
    }
}
