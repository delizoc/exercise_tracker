import React from 'react';
import { Link } from 'react-router-dom';
import ExerciseList from '../components/ExerciseList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AiFillFileAdd } from 'react-icons/ai';


function HomePage({ setExerciseToEdit }) {

    const [exercise, setExercise] = useState([]);
    const history = useHistory();

    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            setExercise(exercise.filter(m => m._id !== _id));
        } else {
            console.error(`Failed to delete exercise with _id = ${_id}, status code = ${response.status}`);
        }
    };

    const onEdit = exercise => {
        setExerciseToEdit(exercise);
        history.push("/edit-exercise");
    }

    const onAdd = () => {
        history.push("/add-exercise");
    }

    const loadExercise = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercise(data);
    }

    useEffect(() => {
        loadExercise();
    }, []);

    return (
        <>
            <h2>List of Exercises</h2>
            <ExerciseList exercise={exercise} onDelete={onDelete} onEdit={onEdit}></ExerciseList>
            
            <Link to="/add-exercise">Add a Exercise</Link><AiFillFileAdd onClick={() => onAdd()} />
            
        </>
    );
}

export default HomePage;