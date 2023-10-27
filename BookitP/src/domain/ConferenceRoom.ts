import { randomUUID } from "crypto";

export class ConferenceRoom {
  private isAvailable = false;
  private constructor(
    private id: string,
    readonly name: string,
    readonly description: string,
    readonly capacity: number,
    readonly pricePerHour: number,
    readonly ower_id: string
  ) {
    const minPricePerNight = 7;
    if (pricePerHour < minPricePerNight) pricePerHour = 7;
    if (capacity < 30)
      throw new Error("Capacity Conference Room must be greater than 30.");
    if (name.length === 0 || name.split(" ").length < 2)
      throw new Error("Conference room name is invalid!");
    const nameFormater =
      name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  getId() {
    return this.id;
  }

  getIsAvailable() {
    return this.isAvailable;
  }

  static create(
    name: string,
    description: string,
    capacity: number,
    pricePerHour: number,
    ower_id: string,
    id?: string
  ) {
    const currentId = id ?? randomUUID();
    return new ConferenceRoom(
      currentId,
      name,
      description,
      capacity,
      pricePerHour,
      ower_id
    );
  }
}
