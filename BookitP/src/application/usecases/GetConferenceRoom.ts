import { ConferenceRoomRepository } from "../repositories/ConfereeRoomRepository";

export class GetConferenceRoom {
  constructor(readonly conferenceRoomRepository: ConferenceRoomRepository) {}

  async execute(client_id: string): Promise<Output> {
    const conferenceRoom = await this.conferenceRoomRepository.getByClientId(
      client_id
    );
    return {
      conferenceName: conferenceRoom.name,
      description: conferenceRoom.description,
      pricePerHour: conferenceRoom.pricePerHour,
      isAvailable: conferenceRoom.getIsAvailable()
    };
  }
}

type Output = {
  pricePerHour: number;
  conferenceName: string;
  description: string;
  isAvailable: boolean;
};
