import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';

import React from 'react';

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
  const revText = useRef();
  const [error, setError] = useState(null);

  let params = useParams();
  const movieId = params.movieId;

  useEffect(() => {
    getMovieData(movieId);
  }, []);

  const addReview = async (e) => {
    e.preventDefault();

    const rev = revText.current;

    try {
      const response = await fetch('http://localhost:8080/api/v1/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reviewBody: rev.value, imdbId: movieId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedReviews = [...reviews, { body: rev.value }];

      rev.value = '';

      setReviews(updatedReviews);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong.');
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h3>Reviews</h3>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <img src={movie?.poster} alt="" />
        </Col>
        <Col>
          <>
            <Row>
              <Col>
                <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review?" />
              </Col>
            </Row>
            <Row>
              <Col>
                <hr />
              </Col>
            </Row>
          </>
          {error && (
            <Row>
              <Col>
                <p style={{ color: 'red' }}>{error}</p>
              </Col>
            </Row>
          )}
          {reviews?.map((r, index) => (
            <React.Fragment key={index}>
              <Row>
                <Col>{r.body}</Col>
              </Row>
              <Row>
                <Col>
                  <hr />
                </Col>
              </Row>
            </React.Fragment>
          ))}
        </Col>
      </Row>
      <Row>
        <Col>
          <hr />
        </Col>
      </Row>
    </Container>
  );
};

export default Reviews;
