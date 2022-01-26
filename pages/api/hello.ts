import { getRequestHandler, Handler } from "../../src/api/helpers/handlers";

const getHello: Handler<string> = async (req, res) => {
  res.send({
    data: "Hello World",
  });
};

export default getRequestHandler({ GET: getHello });
