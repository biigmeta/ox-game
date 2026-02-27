import CryptoJS from "crypto-js";

export const encryptPassword = (password: string): string => {
  const encryptedPassword = CryptoJS.AES.encrypt(
    password!.toString().trim(),
    process.env.PWD_SECRET || "secret"
  ).toString();
  return encryptedPassword;
};

export const comparePassword = (
  plainPassword: string,
  encryptedPassword: string
): boolean => {
  if (!plainPassword || !encryptedPassword) {
    return false;
  }

  const bytes = CryptoJS.AES.decrypt(
    encryptedPassword || ".",
    process.env.PWD_SECRET || "secret"
  );
  const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

  return plainPassword.toString() == originalPassword.toString();
};
