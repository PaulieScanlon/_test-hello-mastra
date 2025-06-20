import { Mastra } from "@mastra/core/mastra";
import { PinoLogger } from "@mastra/loggers";
import { LibSQLStore } from "@mastra/libsql";
import { weatherWorkflow } from "./workflows/weather-workflow";
import { weatherAgent } from "./agents/weather-agent";
import { weatherTool } from "./tools/weather-tool";
import { MCPServer } from "@mastra/mcp";

const weatherMcpServer = new MCPServer({
  name: "Weather MCP Server",
  version: "1.0.1",
  tools: { weatherTool }
});

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { weatherAgent },
  storage: new LibSQLStore({
    // stores telemetry, evals, ... into memory storage, if it needs to persist, change to file:../mastra.db
    url: ":memory:"
  }),
  logger: new PinoLogger({
    name: "Mastra",
    level: "info"
  }),
  mcpServers: { weatherMcpServer }
  // telemetry: {
  //   serviceName: "hello-mastra",
  //   enabled: true,
  //   sampling: {
  //     type: "always_on"
  //   },
  //   export: {
  //     type: "otlp",
  //     endpoint: "http://localhost:4318"
  //   }
  // }
  // server: {
  //   build: {
  //     openAPIDocs: true
  //   }
  // }
});
