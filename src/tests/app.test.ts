import request from "supertest";
import app from "../index";

describe("Auth", () => {
  test("POST /api/login - Login valid credentials", async () => {
    const response = await request(app)
      .post("/api/login")
      .send({ username: "admin", password: "password123" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  test("POST /api/login - Login invalid credentials", async () => {
    const response = await request(app)
      .post("/api/login")
      .send({ username: "admin", password: "wrongpassword" });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "error",
      "Invalid username or password"
    );
  });
});

describe("Task", () => {
  let token: string;

  beforeAll(async () => {
    const response = await request(app)
      .post("/api/login")
      .send({ username: "admin", password: "password123" });

    token = response.body.token;
  });

  test("POST /api/tasks - Create Task", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Task" });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("title", "Test Task");
    expect(response.body).toHaveProperty("completed", false);
  });

  test("GET /api/tasks - Get all Tasks", async () => {
    const response = await request(app)
      .get("/api/tasks")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GET /api/tasks/:id - Get Task by ID", async () => {
    const createResponse = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Another Test Task" });

    const taskId = createResponse.body._id;

    const response = await request(app)
      .get(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("title", "Another Test Task");
  });

  test("PUT /api/tasks/:id - Update Task", async () => {
    const createResponse = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Task to Update" });

    const taskId = createResponse.body._id;

    const response = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Updated Task", completed: true });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("title", "Updated Task");
    expect(response.body).toHaveProperty("completed", true);
  });

  test("DELETE /api/tasks/:id - Delete Task", async () => {
    const createResponse = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Task to Delete" });

    const taskId = createResponse.body._id;

    const response = await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Task deleted successfully"
    );
  });
});
