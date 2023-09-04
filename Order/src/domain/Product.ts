export class Product {
    constructor(
        readonly name: string,
        readonly quantity: number,
        readonly price: number,
        public description?: string
    ) {}

    getSubtotal() {
        return this.price * this.quantity;
    }
}
