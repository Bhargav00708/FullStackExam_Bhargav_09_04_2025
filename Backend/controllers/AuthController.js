const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/sql/User');

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ msg: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });

    return res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    return res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

module.exports = { register, login };
