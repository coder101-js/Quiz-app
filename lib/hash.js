import bcrypt from 'bcryptjs';

export const hash = async (password, saltRounds = 12) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  } catch (err) {
    console.error('❌ Error hashing password:', err);
    return false;
  }
};

export const compare = async (rawPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(rawPassword, hashedPassword);
  } catch (err) {
    console.error('❌ Error comparing passwords:', err);
    return false;
  }
};
