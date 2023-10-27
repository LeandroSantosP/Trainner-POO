import { ConferenceRoom } from "@/domain/ConferenceRoom";
import { ConferenceRoomRepository } from "../repositories/ConfereeRoomRepository";

export class CreateConferenceRoom {
  constructor(readonly conferenceRoomRepository: ConferenceRoomRepository) {}

  async execute(input: Input): Promise<void> {
    const room = ConferenceRoom.create(
      input.name,
      input.description,
      input.capacity,
      input.pricePerHour,
      input.client_id
    );
    await this.conferenceRoomRepository.persiste(room);
  }
}

type Input = {
  client_id: string;
  name: string;
  description: string;
  pricePerHour: number;
  capacity: number;
  address: {
    street: string;
    number: number;
    state: string;
  };
};
