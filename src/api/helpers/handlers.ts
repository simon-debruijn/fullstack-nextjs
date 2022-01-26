import { NextApiRequest, NextApiResponse } from "next";
import { HttpError, InternalServerError, NotFound } from "http-errors";

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

    try {
      if (!handler) {
        console.log(
          `Handler for method ${req.method} on path ${req.url} is undefined`,
        );
        throw new NotFound();
      }

      await handler(req, res);
    } catch (error) {
      if (error instanceof HttpError) {
        return res
          .status(error.status)
          .send({ name: error.name, message: error.message });
      }

      console.error(error);

      const serverError = new InternalServerError();

      res.status(500).send({
        name: serverError.name,
        message: serverError.message,
      });
    }
  };
