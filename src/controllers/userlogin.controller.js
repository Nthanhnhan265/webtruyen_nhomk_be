const User = require('../models/user.model'); // Điều chỉnh đường dẫn cho đúng
const bcrypt = require('bcrypt'); // Thêm bcrypt để mã hóa mật khẩu
const jwt = require('jsonwebtoken'); // Thêm jsonwebtoken để tạo token

// Đăng ký
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role_id: 1, // Gán role_id mặc định, điều chỉnh theo nhu cầu
      status: true,
    });

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
};

// Đăng nhập
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in user' });
  }
};
