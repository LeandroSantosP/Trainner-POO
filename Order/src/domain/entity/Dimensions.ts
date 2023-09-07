export class Dimensions {
    constructor(readonly width: number, readonly height: number, readonly length: number, readonly weight: number) {
        Object.values(this).some((value) => {
            if (value < 0) throw new Error("Invalid Dimension, must not be negative");
        });
    }
}
