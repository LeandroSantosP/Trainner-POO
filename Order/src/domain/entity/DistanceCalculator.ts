import { AppError } from "./AppError";
import { Coord } from "./Cord";

export class DistanceCalculator {
    static execute(firstCoord: Coord, secondCoord: Coord, unit: string = "kilometers") {
        let theta = firstCoord.long - firstCoord.long;
        let distance =
            60 *
            1.1515 *
            (180 / Math.PI) *
            Math.acos(
                Math.sin(firstCoord.lat * (Math.PI / 180)) * Math.sin(secondCoord.lat * (Math.PI / 180)) +
                    Math.cos(firstCoord.lat * (Math.PI / 180)) *
                        Math.cos(secondCoord.lat * (Math.PI / 180)) *
                        Math.cos(theta * (Math.PI / 180))
            );

        let result = {
            miles: Math.round(distance),
            kilometers: Math.round(distance * 1.609344),
        } as { [key: string]: number };
        if (!result[unit]) throw new AppError("Invalid unit");
        return result[unit];
    }
}
