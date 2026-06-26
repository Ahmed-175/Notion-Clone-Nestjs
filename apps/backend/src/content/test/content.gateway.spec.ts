import { Test, TestingModule } from "@nestjs/testing";
import { ContentGateway } from "../content.gateway";
import { ContentService } from "../content.service";

describe("ContentGateway", () => {
  let gateway: ContentGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentGateway, ContentService],
    }).compile();

    gateway = module.get<ContentGateway>(ContentGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });
});
