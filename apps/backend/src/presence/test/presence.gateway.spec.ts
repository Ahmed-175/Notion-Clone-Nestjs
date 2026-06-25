import { Test, TestingModule } from "@nestjs/testing";
import { PresenceGateway } from "../presence.gateway";
import { PresenceService } from "../presence.service";
import { WsAuthService } from "src/common/middlewares/ws-auth.service";

describe("PresenceGateway", () => {
  let gateway: PresenceGateway;

  const mockPresenceService = {
    addActiveUser: jest.fn(),
    removeActiveUser: jest.fn(),
    getSetMembers: jest.fn(),
  };

  const mockWsAuthService = {
    authenticate: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PresenceGateway,
        {
          provide: PresenceService,
          useValue: mockPresenceService,
        },
        {
          provide: WsAuthService,
          useValue: mockWsAuthService,
        },
      ],
    }).compile();

    gateway = module.get<PresenceGateway>(PresenceGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });
});
