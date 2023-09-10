import { AppError } from "./AppError";

export class Dimensions {
    constructor(readonly width: number, readonly height: number, readonly length: number, readonly weight: number) {
        Object.values(this).some((value) => {
            if (value < 0) throw new AppError("Invalid Dimension, must not be negative");
        });
    }

    getVolume() {
        return (this.width / 100) * (this.height / 100) * (this.length / 100);
    }

    getDensity() {
        const density = this.weight / this.getVolume();
        return parseFloat(density.toFixed(2));
    }
}
