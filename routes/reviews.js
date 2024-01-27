const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const {validateReview, isLoggedIn, isReviewAutor} = require('../middleware');
const reviews = require('../controllers/reviews');


router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))


router.delete('/:reviewId',isLoggedIn, isReviewAutor, catchAsync(reviews.deleteReview))


module.exports = router;