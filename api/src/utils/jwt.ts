import jwt, { TokenExpiredError, VerifyOptions } from "jsonwebtoken";

export const getAccessToken = (data: any) => {
  const secret = process.env.ACCESS_TOKEN_SECRET || "secret";
  const expiresIn = process.env.ACCESS_TOKEN_EXPIRATION || "30m";
  const token = jwt.sign(data, secret, { expiresIn: expiresIn });

  return token;
};

export const getRefreshToken = (data: any) => {
  const secret = process.env.REFRESH_TOKEN_SECRET || "secret";
  const expiresIn = process.env.REFRESH_TOKEN_EXPIRATION || "7d";
  const token = jwt.sign(data, secret, { expiresIn: expiresIn });
  return token;
};

export const decodeAccessToken = async (
  token: string,
  ignoreExpiration?: boolean
) => {
  try {
    const ignore: boolean =
      process.env.NODE_ENV === "development" ? true : ignoreExpiration || false;
    const options = {
      algorithms: ["HS256"],
      ignoreExpiration: ignore as boolean,
    } as VerifyOptions;

    const decoded = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET || "secret",
      options
    );

    return decoded as any;
  } catch (err) {
    if (
      err instanceof TokenExpiredError ||
      (err as any).includes("jwt expired")
    ) {
      return {
        name: "TokenExpiredError",
        message: "jwt expired",
      } as Error;
    }

    return {
      name: "InvalidTokenError",
      message: "Invalid token",
    } as Error;
  }
};
