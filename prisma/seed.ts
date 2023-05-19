import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getProducts().map((product) => {
      return db.product.create({ data: product });
    })
  );

  await Promise.all(
    getEmployees().map((employee) => {
      return db.employee.create({ data: employee });
    })
  );

  await Promise.all(
    getDepartments().map((department) => {
      return db.department.create({ data: department });
    })
  );

  console.log("Seeded successfully!");
}

seed();

function getProducts() {
  return [
    {
      name: "The Lord of the Rings",
      description: "The bestseller is again in the hands of the readers. New version of the classic epic.",
      price: 100,
    },
    {
      name: "Harry Potter",
      description: "Return to the world of magic.",
      price: 200,
    },
    {
      name: "The Hobbit",
      description: "The Hobbit is a children's fantasy novel written by English author J.R.R. Tolkien.",
      price: 120,
    },
  ];
}

function getEmployees() {
  return [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "123456789",
      address: "123 Main St",
      salary: 3000,
    },
    {
      name: "Jane Doe",
      email: "jane.doe@example.com",
      phone: "123456789",
      address: "126 Baker St",
      salary: 3000,
    },
  ];
}

function getDepartments() {
  return [
    {
      name: "IT",
      description: "IT department",
    },
    {
      name: "HR",
      description: "HR department",
    },
  ];
}
