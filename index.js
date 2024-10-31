'use strict';

const express = require('express');
const app = express();

let categories = ['funnyJoke', 'lameJoke'];
let funnyJoke = [
  {
    'joke': 'Why did the student eat his homework?',
    'response': 'Because the teacher told him it was a piece of cake!'
  },
  {
    'joke': 'What kind of tree fits in your hand?',
    'response': 'A palm tree'
  },
  {
    'joke': 'What is worse than raining cats and dogs?',
    'response': 'Hailing taxis'
  }
];
let lameJoke = [
  {
    'joke': 'Which bear is the most condescending?',
    'response': 'Pan-DUH'
  },
  {
    'joke': 'What would the Terminator be called in his retirement?',
    'response': 'The Exterminator'
  }
];

app.get('/jokebook/categories', (req, res) => {
  const response = categories.map(category => `a possible category is ${category}`).join('\n');
  res.type('text/plain').send(response);
});

app.get('/jokebook/joke/:category', (req, res) => {
  const { category } = req.params;
  
  if (!categories.includes(category)) {
    return res.status(400).json({'error': 'no category listed for category'});
  }

  const jokes = category === 'funnyJoke' ? funnyJoke : lameJoke;
  const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
  
  res.json(randomJoke);
});

app.use(express.static('public'));
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
