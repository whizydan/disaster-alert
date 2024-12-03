// types.d.ts

// Define the roles as string literals
type Role = "system" | "user" | "assistant" | "tool" | "function";

// Base message interface
interface BaseMessage {
  role: Role;
  content: string;
}

// Extended message interface for 'function' role
interface FunctionMessage extends BaseMessage {
  role: "function";
  name: string;
}

// Union type for chat completion messages
type ChatCompletionMessageParam = BaseMessage | FunctionMessage;
