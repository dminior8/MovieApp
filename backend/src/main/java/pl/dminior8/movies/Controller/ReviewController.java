package pl.dminior8.movies.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.dminior8.movies.Model.Review;
import pl.dminior8.movies.Service.ReviewService;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/reviews")
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @PostMapping
    public ResponseEntity<Review>createReview(
            @RequestBody Map<String, String> payload){
        return new ResponseEntity<Review>(
                reviewService.createReview(payload.get("reviewBody"),
                        payload.get("imdbId")), HttpStatus.OK);
    }
}
