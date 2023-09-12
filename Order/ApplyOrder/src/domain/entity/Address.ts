import { Coord } from "./Cord";

export class Address {
    cord: Coord;
    constructor(
        readonly document: string,
        readonly street: string,
        readonly city: string,
        readonly neighborhood: string,
        lat: number,
        long: number
    ) {
        this.cord = new Coord(lat, long);
    }
}
