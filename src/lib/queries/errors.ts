import { z } from "zod";

export class AppError extends Error {
	clientMsg: string;
	title: string;
	constructor(msg: string, clientMsg: string, title: string) {
		super(msg);
		this.clientMsg = clientMsg;
		this.title = title;
	}
}

export class ApiError extends AppError {
	clientMsg: string;
	title: string;
	constructor(msg: string, clientMsg: string, title: string) {
		super(msg, clientMsg, title);
		this.clientMsg = clientMsg;
		this.title = title;
	}
}

export class NetworkError extends ApiError {
	constructor(clientMsg: string) {
		super("NetworkError", clientMsg, "Connection Issue");
	}
}
export class ServerError extends ApiError {
	constructor(clientMsg: string) {
		super("ServerError", clientMsg, "We’re Experiencing a Problem");
	}
}
export class SchemaError extends ApiError {
	constructor(clientMsg: string) {
		super("SchemaError", clientMsg, "We’re Experiencing a Problem");
	}
}

export const ApiErrorObjectSchema = z.object({
	ok: z.literal(false),
	msg: z.string(),
	code: z.number(),
});
