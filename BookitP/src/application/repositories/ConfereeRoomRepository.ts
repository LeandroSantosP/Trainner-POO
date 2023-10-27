import { ConferenceRoom } from "@/domain/ConferenceRoom";

export interface ConferenceRoomRepository {
  persiste(ConferenceRoom: ConferenceRoom): Promise<void>;
  getbyId(id: string): Promise<ConferenceRoom>;

  getByClientId(id: string): Promise<ConferenceRoom>;
}
