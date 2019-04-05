const express = require('express');
const bookmarks = require('./store');
const uuid = require('uuid/v4');
const logger = require('./logger');

const router = express.Router();


router.route('/')
  .get((req, res) => {
    res.json(bookmarks);
  })
  .post((req, res) => {
    const { title, url, desc, rating } = req.body;

  if (!title) {
    logger.error(`Title is required`);
    return res 
      .status(400)
      .send('Invalid data');
  }
  if (!url) {
    logger.error(`URL is required`);
    return res 
      .status(400)
      .send('Invalid data');
  }

  let repeats = bookmarks.filter(bookmark => 
    bookmark.url === url
  )
  console.log(repeats);

  if (repeats.length > 0) {
    logger.error(`Bookmark for ${url} already exists`);
    return res 
      .status(400)
      .send('Invalid data');
  }

  if (rating) {
    if (isNaN(rating) || rating > 5 || rating < 1) {
      logger.error(`Rating must be a number between 1 and 5`);
      return res 
        .status(400)
        .send('Invalid data');
    }
  }

  const id = uuid();

  const bookmark = {
    id,
    title,
    url,
    desc,
    rating: parseFloat(rating)
  };

  bookmarks.push(bookmark);

  logger.info(`Bookmark with id ${id} created`);

  res
    .status(201)
    .location(`http://localhost:8000/bookmarks/${id}`)
    .json({id});
  });


router.route('/:id')
  .delete((req, res) => {
    const { id } = req.params;

  const listIndex = lists.findIndex(li => li.id == id);

  if (listIndex === -1) {
    logger.error(`List with id ${id} not found.`);
    return res 
      .status(404)
      .send('Not Found');
  }

  list.splice(listIndex, 1);

  logger.info(`List with id ${id} deleted.`);
  res
    .status(204)
    .end();
  });


module.exports = router;