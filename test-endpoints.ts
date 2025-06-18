// import "dotenv/config";
// import { MastraClient } from "@mastra/client-js";

// const client = new MastraClient({
//   baseUrl: "http://localhost:4111"
// });

// (async () => {
//   const agent = client.getAgent("weatherAgent");

//   const response = await agent.generate({
//     messages: [{ role: "user", content: "What is the weather in London?" }]
//   });

//   console.log(response.text);
// })();

// (async () => {
//   const response = await fetch("http://localhost:4111/api/agents/weatherAgent/generate", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       messages: [{ role: "user", content: "What is the weather in London?" }]
//     })
//   });

//   const data = await response.json();
//   console.log(data.text);
// })();

// import { MastraClient } from "@mastra/client-js";

// const client = new MastraClient({
//   baseUrl: "http://localhost:4111"
// });

(async () => {
  await fetch("http://localhost:4111/api/workflows/weatherWorkflow/20db1e1f-b3da-41d4-bdc6-565927f9a60f/start", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      inputData: { city: "London" },
      runtimeContext: {}
    })
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
})();
