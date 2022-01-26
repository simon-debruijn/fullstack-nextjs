import { NextApiRequest, NextApiResponse } from "next";
import { HttpError } from "http-errors";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type ResponseSchema<TResponse> = {
  data: TResponse;
  count?: number;
};

export type Handler<TResponse> = (
  req: NextApiRequest,
  res: NextApiResponse<ResponseSchema<TResponse> | HttpError>,
) => Promise<any>;

type MethodToHandlerConfig<TResponse = unknown> = Partial<
  Record<Method, Handler<TResponse | HttpError>>
>;

export const getRequestHandler =
  (config: MethodToHandlerConfig) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const handler = config[req.method as Method];
    if (!handler) {
      throw new Error(
        `Handler for method ${req.method} on path ${req.url} is undefined`,
      );
    }

    try {
      await handler(req, res);
    } catch (error) {
      if (error instanceof HttpError) {
        return res
          .status(error.status)
          .send({ name: error.name, message: error.message });
      }

      console.error("HttpError", error);
      res.status(500).send({
        name: "InternalServerError",
        message: "Internal Server Error",
      });
    }
  };
