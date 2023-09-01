export type RentInput = {
    client_id: string;
    plate: string;
    return_rental_date: Date;
};

export type RentOutput = {
    status: string;
    car_plate: string;
    rental_date_end: Date;
    rental_date_start: Date;
};

export type GetRentalOutput = {
    status: string;
    car_plate: string;
    rental_date_end?: Date;
    rental_date_start: Date;
};
