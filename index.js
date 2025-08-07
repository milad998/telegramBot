require('dotenv').config();
const { default: axios } = require('axios');
const express = require('express');
const cors = require('cors'); // ⬅️ مهم إذا كنت تتصل من React

const app = express();
app.use(cors()); // ⬅️ مهم جدًا لمنع خطأ CORS
app.use(express.json());

app.post('/', async (req, res) => {
  const token = process.env.token;
  const chat_id = process.env.chat_id;
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: 'Text is empty' });
  }

  try {
    await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
      chat_id,
      text,
    });

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ message: 'Failed to send message', error: err.message });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
