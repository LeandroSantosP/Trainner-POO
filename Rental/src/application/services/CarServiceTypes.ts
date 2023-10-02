export type RentInput = {
    client_id: string;
    plate: string;
    return_rental_date: Date;
};

export type GetRentalOutput = {
    status: string;
    car_plate: string;
    rental_date_end?: Date;
    rental_return_date: Date;
    rentalPeriod: number;
    currentPrice: number;
};

export type PaymentRentalInput = {
    carPlate: string;
    paymentToken: string;
};
