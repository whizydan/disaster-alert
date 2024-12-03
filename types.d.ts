// types.d.ts

type Role = "system" | "user" | "assistant" | "tool" | "function";

interface BaseMessage {
  role: "system" | "user" | "assistant" | "tool";
  content: string;
}

interface FunctionMessage {
  role: "function";
  name: string;
  content: string;
}

type ChatCompletionMessageParam = BaseMessage | FunctionMessage;
