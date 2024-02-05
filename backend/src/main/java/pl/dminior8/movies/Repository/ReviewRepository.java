package pl.dminior8.movies.Repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.dminior8.movies.Model.Review;

@Repository
public interface ReviewRepository extends MongoRepository<Review, ObjectId> {

}
