const { Router } = require('express');
const Bid = require('../models/').bid;
const authMiddleware = require('../auth/middleware');

const router = new Router();

// http -v localhost:4000/spaces
router.get('/', async (request, response) => {
  try {
    response.send('Teste: Hello from bids');
    // const allBids = await Bid.findAll();
    // response.send(allBids);
  } catch (error) {
    console.log('error from all stories: ', error.message);
  }
});

// http -v POST :4000/bids value=45 userId=1 storyId=1 Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1NjI1ODM5OSwiZXhwIjoxNjU2MjY1NTk5fQ.4ALauwbZpHHCawppE4ILZI5DVCIapSEZ9D5kJXnXixg"
router.post('/', authMiddleware, async (request, response, next) => {
  try {
    const { value, userId, storyId } = request.body;
    const newBid = await Bid.create({
      value,
      userId,
      storyId
    });
    response.send(newBid);
  } catch (error) {
    console.log('error from Story router: ', error.message);
    next(error);
  }
});

module.exports = router;
