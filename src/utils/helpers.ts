import bcrypt from "bcrypt";
import crypto from "crypto";

// ---------- Hash Password ----------
export const hashPassword = async (password: string): Promise<string> => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    throw new Error("Unable to hash password");
  }
};

// ---------- Validate hash password ----------
export const validatePassword = async (
  inputPassword: string,
  hashPassword: string
): Promise<boolean> => {
  try {
    return await bcrypt.compare(inputPassword, hashPassword);
  } catch (error) {
    return false;
  }
};

// ---------- Generate random string base on timestamp ----------
export const generateToken = (): string => {
  const randomBytes = crypto.randomBytes(32).toString("base64");
  const timestamp = Date.now().toString(36); // Convert timestamp to a base36 string for compactness
  return `${randomBytes}-${timestamp}`;
};

// ---------- Extract date from string ----------
export const extractDateFromString = (input: string): Date => {
  const time = parseInt(input);
  const duration = input.substring(time.toString().length);

  const currentDate = new Date();

  const durationMultipliers: { [key: string]: number } = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };

  const multiplier = durationMultipliers[duration] || durationMultipliers["d"];

  return new Date(currentDate.getTime() + time * multiplier);
};
