import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { LibSQLStore } from "@mastra/libsql";
// import { MCPClient } from "@mastra/mcp";

import { weatherTool } from "../tools/weather-tool";

import { SummarizationMetric } from "@mastra/evals/llm";
import { ContentSimilarityMetric, ToneConsistencyMetric } from "@mastra/evals/nlp";

const model = openai("gpt-4o-mini");

// const weatherMcpClient = new MCPClient({
//   servers: {
//     weather: {
//       url: new URL("https://server.smithery.ai/@isdaniel/mcp_weather_server/mcp?api_key=9a5376e9-c242-4c28-92ff-7af79f234b7a")
//     }
//   }
// });

// const mcpWeatherTools = await weatherMcpClient.getTools();

export const weatherAgent = new Agent({
  name: "Weather Agent",
  instructions: `
      You are a helpful weather assistant that provides accurate weather information.

      Your primary function is to help users get weather details for specific locations. When responding:
      - Always ask for a location if none is provided
      - If the location name isn’t in English, please translate it
      - If giving a location with multiple parts (e.g. "New York, NY"), use the most relevant part (e.g. "New York")
      - Include relevant details like humidity, wind conditions, and precipitation
      - Keep responses concise but informative

      Use the weatherTool to fetch current weather data.
`,
  model: model,
  // tools: { weatherTool, ...mcpWeatherTools },
  tools: { weatherTool },
  memory: new Memory({
    storage: new LibSQLStore({
      url: "file:../mastra.db" // path is relative to the .mastra/output directory
    })
  }),
  evals: {
    summarization: new SummarizationMetric(model),
    contentSimilarity: new ContentSimilarityMetric(),
    tone: new ToneConsistencyMetric()
  }
});
