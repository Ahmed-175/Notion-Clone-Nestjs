import { INestApplication } from "@nestjs/common";
import { getConnectionToken } from "@nestjs/mongoose";
import { Test } from "@nestjs/testing";
import cookieParser from "cookie-parser";
import { AppModule } from "src/app.module";
import { REDIS_CLIENT } from "src/redis/redis.constants";
import request from "supertest";
import Redis from "ioredis";

describe("Nodes Module E2E Testing", () => {
  let app: INestApplication;
  let agent: any;
  let userId: string;
  let nodeId: string;
  let redis: Redis;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.use(cookieParser());
    await app.init();

    redis = app.get<Redis>(REDIS_CLIENT);

    const connection = app.get(getConnectionToken());
    await connection
      .collection("users")
      .deleteMany({ email: "node-test@gmail.com" });
    await connection.collection("nodes").deleteMany({});
    await connection.collection("notes").deleteMany({});

    agent = request.agent(app.getHttpServer());

    // Register and Login to get session
    await agent.post("/auth/register").send({
      username: "nodetest",
      email: "node-test@gmail.com",
      password: "password123",
    });

    await agent.post("/auth/login").send({
      email: "node-test@gmail.com",
      password: "password123",
    });
  });

  afterAll(async () => {
    if (app) {
      const connection = app.get(getConnectionToken());
      await connection.close();
      await app.close();
    }
    await redis.quit();
  });

  it("should create a new node (folder) /nodes/create (POST)", async () => {
    const res = await agent.post("/nodes/create").send({
      title: "Test Folder",
      type: "folder",
      parentId: null,
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "item created successfully");
    expect(res.body.node).toHaveProperty("title", "Test Folder");
    nodeId = res.body.node._id;
  });

  it("should create a new note inside the folder /nodes/create (POST)", async () => {
    const res = await agent.post("/nodes/create").send({
      title: "Test Note",
      type: "note",
      parentId: nodeId,
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "item created successfully");
    expect(res.body.node).toHaveProperty("title", "Test Note");
    expect(res.body.node).toHaveProperty("parentId", nodeId);
  });

  it("should get the note tree /nodes (GET)", async () => {
    const res = await agent.get("/nodes");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("map");
  });

  it("should toggle favorite status /nodes/:id/favorite (PATCH)", async () => {
    const res = await agent.patch(`/nodes/${nodeId}/favorite`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Added to favorites");
    expect(res.body.node.isFavorite).toBe(true);
  });

  it("should update node title /nodes/:id (PUT)", async () => {
    const res = await agent.put(`/nodes/${nodeId}`).send({
      title: "Updated Folder Title",
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("title", "Updated Folder Title");
  });

  it("should soft delete a node /nodes/:id (DELETE)", async () => {
    const res = await agent.delete(`/nodes/${nodeId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("isTrash", true);
  });
});
