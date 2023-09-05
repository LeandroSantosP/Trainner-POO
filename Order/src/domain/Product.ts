export class Product {
    constructor(readonly name: string, readonly quantity: number, readonly price: number, public description?: string) {
        if (quantity < 0) throw new Error("Product quantity must not be negative");
    }

    getSubtotal() {
        return this.price * this.quantity;
    }
}

// One way for implement taxes in products entity
abstract class ProductTax extends Product {
    abstract FARE: number;
    constructor(name: string, quantity: number, price: number) {
        super(name, quantity, price);
    }

    abstract calculateFare(): { fare: number; priceWithFare: number };
}

class TV extends ProductTax {
    FARE: number;
    constructor(quantity: number, price: number) {
        super("TV", quantity, price);
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
