import { NextFunction, Request, Response } from "express";

const dataCasingMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body) {
    req.body = convertToCamelCase(req.body);
  }

  if (req.query) {
    const newQuery = convertToCamelCase(req.query);

    // clear old keys
    Object.keys(req.query).forEach((key) => {
      delete (req.query as any)[key];
    });

    // assign new keys
    Object.assign(req.query, newQuery);
  }

  next();
};

const convertToCamelCase = (data: any): any => {
  if (Array.isArray(data)) {
    return data.map(convertToCamelCase);
  }

  if (data !== null && typeof data === "object") {
    const newData: any = {};

    for (const key in data) {
      const newKey = key.replace(/([-_][a-z])/gi, ($1) =>
        $1.toUpperCase().replace("-", "").replace("_", "")
      );

      newData[newKey] = convertToCamelCase(data[key]);
    }

    return newData;
  }

  return data;
};

export default dataCasingMiddleware;