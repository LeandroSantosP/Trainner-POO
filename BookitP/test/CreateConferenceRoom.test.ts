import { ConferenceRoomRepository } from "@/application/repositories/ConfereeRoomRepository";
import { CreateConferenceRoom } from "@/application/usecases/CreateConferenceRoom";
import { GetConferenceRoom } from "@/application/usecases/GetConferenceRoom";
import { ConferenceRoom } from "@/domain/ConferenceRoom";
let createConferenceRoom: CreateConferenceRoom;
let getConferenceRoom: GetConferenceRoom;

interface ConferenceRoomRepositoryTest extends ConferenceRoomRepository {
  rooms: Array<ConferenceRoom>;
}
beforeEach(() => {
  const conferenceRoomRepositor: ConferenceRoomRepositoryTest = {
    rooms: [],
    async persiste(ConferenceRoom: ConferenceRoom): Promise<void> {
      this.rooms.push(ConferenceRoom);
    },
    async getbyId(id: string): Promise<ConferenceRoom> {
      const room = this.rooms.find((r) => r.getId() === id);
      if (!room) throw new Error("Room not found.");
      return room;
    },
    async getByClientId(id: string): Promise<ConferenceRoom> {
      const room = this.rooms.find((r) => r.ower_id === id);
      if (!room) throw new Error("Room not found.");
      return room;
    }
  };
  createConferenceRoom = new CreateConferenceRoom(conferenceRoomRepositor);
  getConferenceRoom = new GetConferenceRoom(conferenceRoomRepositor);
});
// add comment
test("Should be possible create a Conference Room.", async () => {
  const input = {
    client_id: "12345",
    name: "Party hall",
    address: {
      street: "Road One",
      state: "SP",
      number: 3456
    },
    capacity: 100,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequa",
    pricePerHour: 10
  };
  await createConferenceRoom.execute(input);
  const output = await getConferenceRoom.execute("12345");

  expect(output.pricePerHour).toBe(10);
  expect(output.conferenceName).toBe("Party hall");
  expect(output.description).toBe(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequa"
  );
  expect(output.isAvailable).toBeFalsy();
});
