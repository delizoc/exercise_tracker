// Get the mongoose object
import mongoose from 'mongoose';

// Prepare to the database exercises in the MongoDB server running locally on port 27017
mongoose.connect(
    "mongodb://localhost:27017/exercises",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

// Tell mongoose to create indexes, which help with faster querying
mongoose.set("useCreateIndex", true);

/**
 * Define the schema
 */
const weightSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true},
    unit: { type: String, required: true, enum: ['kg', 'lbs']},
    date: { type: String, required: true }
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Exercise = mongoose.model("Exercise", weightSchema);

/**
 * Create a excercise
 * @param {String} name
 * @param {Number} reps 
 * @param {Number} weight
 * @param {String} unit
 * @param {String} date
 * @returns A promise. Resolves to the JSON object for the document created by calling save
 */
const createExercise = async (name, reps, weight, unit, date) => {
    // Call the constructor to create an instance of the model class Exercise
    const exercise = new Exercise({ name: name, reps: reps, weight: weight, unit: unit, date: date });
    // Call save to persist this object as a document in MongoDB
    return exercise.save();
}

/**
 * Retrive movies based on the filter, projection and limit parameters
 * @param {Object} filter 
 * @param {String} projection 
 * @param {Number} limit 
 * @returns 
 */
const findExercise = async (filter, projection, limit) => {
    const query = Exercise.find(filter)
        .select(projection)
        .limit(limit);
    return query.exec();
}

/**
 * Find the movie with the given ID value
 * @param {String} _id 
 * @returns 
 */
const findExerciseById = async (_id) => {
    const query = Exercise.findById(_id);
    return query.exec();
}

/**
 * Replace the title, year, language properties of the movie with the id value provided
 * @param {String} _id 
 * @param {String} name 
 * @param {Number} reps
 * @param {Number} weight
 * @param {String} unit
 * @param {String} date
 * @returns A promise. Resolves to the number of documents modified
 */
const replaceExercise = async (_id, name, reps, weight, unit, date) => {
    const result = await Exercise.replaceOne({ _id: _id }, { name: name, reps: reps, weight: weight, unit: unit, date: date });
    return result.nModified;
}


/**
 * Delete the movie with provided id value
 * @param {String} _id 
 * @returns A promise. Resolves to the count of deleted documents
 */
const deleteById = async (_id) => {
    const result = await Exercise.deleteOne({ _id: _id });
    // Return the count of deleted document. Since we called deleteOne, this will be either 0 or 1.
    return result.deletedCount;
}

export { deleteById, replaceExercise, findExerciseById, createExercise, findExercise };