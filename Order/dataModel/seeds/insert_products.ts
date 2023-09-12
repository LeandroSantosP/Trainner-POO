import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("product").del();

  // Inserts seed entries
  await knex("product").insert([
    {
      name: "TV",
      price: 1300,
      description: "TV ....",
      id: "a3ff22d2-4e54-4db4-ae87-9e739f578009",
      height: 20,
      length: 20,
      density: 0.35,
      volume: 28.57,
      weight: 3,
      width: 30,
      fare: 10
    },
    {
      name: "SmartPhone",
      price: 2000,
      description: "Smartphone ....",
      id: "e0907ecf-3b90-4bbf-b741-ad3da998b59e",
      height: 20,
      length: 20,
      weight: 3,
      width: 30,
      density: 0.35,
      volume: 28.57,
      fare: 40
    },
    {
      id: "3faccc5e-ab42-405e-b75e-45fba9c920cd",
      name: "Camisa",
      price: 25,
      description: "Camisa ....",
      height: 20,
      length: 20,
      weight: 3,
      density: 0.35,
      volume: 28.57,
      width: 30
    }
  ]);
}
