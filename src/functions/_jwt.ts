import jwt from "jsonwebtoken";

interface encode {
  (secretKey: string, data: { id: number; name: string }): string;
}

interface decode {
  (secretKey: string, jwt: string): any;
}

export const encodeSession: encode = (secretKey, data) => {
  const encode: string = jwt.sign(data, secretKey, {
    expiresIn: "1h",
  });

  return encode;
};

export const decodeSession: decode = (secretKey, jwtClient) => {
  const decode = jwt.verify(jwtClient, secretKey);

  return decode;
};
