import db from "#db/client";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  const employees = [
    { name: "Alice Smith", birthday: "1985-02-20", salary: 60000 },
    { name: "Bob Johnson", birthday: "1990-06-15", salary: 55000 },
    { name: "Carol White", birthday: "1987-11-30", salary: 65000 },
    { name: "David Lee", birthday: "1992-01-10", salary: 50000 },
    { name: "Eve Harris", birthday: "1988-07-25", salary: 62000 },
    { name: "Frank Moore", birthday: "1983-05-05", salary: 58000 },
    { name: "Grace Kim", birthday: "1991-12-12", salary: 59000 },
    { name: "Henry Wilson", birthday: "1989-03-17", salary: 63000 },
    { name: "Isabel Clark", birthday: "1986-09-29", salary: 61000 },
    { name: "Jack Davis", birthday: "1993-10-21", salary: 54000 },
  ];

  for (const emp of employees) {
    await db.query(
      `INSERT INTO employees (name, birthday, salary) VALUES ($1, $2, $3)`,
      [emp.name, emp.birthday, emp.salary]
    );
  }
}
