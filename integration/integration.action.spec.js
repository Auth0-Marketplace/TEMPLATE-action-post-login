const { eventMock } = require("../__mocks__/event-post-login");
const { apiMock } = require("../__mocks__/api-post-login");

const { onExecutePostLogin } = require("./integration.action");

describe("Action integration", () => {
  let consoleLogMock;

  beforeEach(() => {
    consoleLogMock = jest.spyOn(console, "log").mockImplementation();
  });

  afterEach(() => {
    consoleLogMock.mockRestore();
    jest.clearAllMocks();
    eventMock.secrets = {};
  });

  describe("onExecutePostLogin", () => {
    it("executes", async () => {
      expect(async () => {
        await onExecutePostLogin(eventMock, apiMock);
      }).not.toThrow();
    });
  });
});
