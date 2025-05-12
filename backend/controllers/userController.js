import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({name:username });
    if (!user) return res.status(400).json({ message: 'User Not Found!' });
   
   const isMatch = await bcrypt.compare(password, user.password);
   
   if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1d' }
    );
   return res.status(200).json({ token, message:'Login Successful!' });
  } catch (err) {
   return res.status(500).json({ message: 'Server error' });
  }
};
