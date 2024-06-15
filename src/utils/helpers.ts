import bcrypt from "bcrypt";

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
    throw new Error("Unable to validate hash password");
  }
};
