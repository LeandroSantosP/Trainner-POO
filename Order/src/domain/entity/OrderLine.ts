export class OrderLine {
    constructor(readonly id: string, readonly name: string, readonly quantity: number, readonly price: number) {
        if (quantity < 0) throw new Error("Product quantity must not be negative");
    }

    getSubtotal() {
        return this.price * this.quantity;
    }
}

// One way for implement taxes in OrderLines entity
abstract class OrderLineTax extends OrderLine {
    abstract FARE: number;
    constructor(id: string, name: string, quantity: number, price: number) {
        super(id, name, quantity, price);
    }

    abstract calculateFare(): { fare: number; priceWithFare: number };
}

class TV extends OrderLineTax {
    FARE: number;
    constructor(id: string, quantity: number, price: number) {
        super(id, "TV", quantity, price);
        this.FARE = 10;
    }

    calculateFare(): { fare: number; priceWithFare: number } {
        const parserPercentage = this.FARE / 100;
        const fare = this.price * parserPercentage;
        const priceWithFare = this.price + fare;
        return {
            fare,
            priceWithFare,
        };
    }
}
