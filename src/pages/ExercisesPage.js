import React, { useState } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import {
  EXERCISES,
  CREATE_EXERCISE,
  UPDATE_EXERCISE,
  DELETE_EXERCISE,
  CREATE_WORKOUT,
} from "../data/graphqlQueries";
import { v4 } from "uuid";
import DropDown from "../components/DropDown/DropDown";
import BODY_PARTS_LIST from "../data/bodyPartsList";
import useNotification from "../hooks/useNotification";
import Exercise from "../components/Exercise/Exercise";
import CreateExerciseForm from "../components/CreateExerciseForm/CreateExerciseForm";
import CreateWorkoutForm from "../components/CreateWorkoutForm/CreateWorkoutForm";
import SecondaryNavigation from "../components/SecondaryNavigation/SecondaryNavigation";
import Spiner from "../helpers/Spiner/Spiner";

import "./ExercisesPage.css";

const ExercisesPage = () => {
  console.log("Exercises page rendered");
  const [exercisesInWorkOut, setExercisesInWorkOut] = useState([]);
  const [bodyPartFilter, setBodyPartFilter] = useState(null);
  const displayNotification = useNotification();

  const { loading, error, data } = useQuery(EXERCISES);
  const [creatExerciseMutation, createExerciseInfo] = useMutation(
    CREATE_EXERCISE,
    {
      update(cache, { data: { createExercise } }) {
        cache.modify({
          fields: {
            exercises(existingItems = []) {
              const newItemRef = cache.writeFragment({
                data: createExercise,
                fragment: gql`
                  fragment NewExercise on Exercise {
                    _id
                    name
                    targetBodyPart
                    targetMuscle
                    __typename
                  }
                `,
              });
              return [...existingItems, newItemRef];
            },
          },
        });
      },

      onCompleted: (data) => {
        displayNotification("GOOD", `Added ${data.createExercise.name}`);
      },
      onError: (err) => {
        displayNotification("ERROR", err.message);
      },
    }
  );
  const [updateExersiceMutation, updateExerciseInfo] = useMutation(
    UPDATE_EXERCISE,
    {
      onCompleted: (data) => {
        displayNotification("GOOD", `Updated ${data.updateExercise.name}`);
      },
      onError: (err) => {
        displayNotification("ERROR", err.message);
      },
    }
  );
  const [deleteExerciseMutation, deleteExerciseInfo] = useMutation(
    DELETE_EXERCISE,
    {
      update(cache, { data: { deleteExercise } }) {
        cache.modify({
          fields: {
            exercises(existingItems = []) {
              return existingItems.filter(
                (item) => item.__ref !== `Exercise:${deleteExercise._id}`
              );
            },
          },
        });
      },

      onCompleted: (data) => {
        displayNotification("GOOD", `Deleted ${data.deleteExercise.name}`);
      },
      onError: (err) => {
        displayNotification("ERROR", err.message);
      },
    }
  );

  const [createWorkoutMutation, createWorkoutInfo] = useMutation(
    CREATE_WORKOUT,
    {
      update(cache, { data: { createWorkout } }) {
        cache.modify({
          fields: {
            workouts(existingItems = []) {
              const newItemRef = cache.writeFragment({
                data: createWorkout,
                fragment: gql`
                  fragment NewWorkout on Workout {
                    _id
                    date
                    length
                    details
                    __typename
                  }
                `,
              });
              return [...existingItems, newItemRef];
            },
          },
        });
      },

      onCompleted: (data) => {
        displayNotification(
          "GOOD",
          `Created workout on ${data.createWorkout.date}`
        );
      },
      onError: (err) => {
        displayNotification("ERROR", err.message);
      },
    }
  );

  const handleSelect = (exercise) => {
    setExercisesInWorkOut((old) => [
      ...old,
      {
        exercise: exercise._id,
        name: exercise.name,
        keyId: v4(),
        sets: 0,
        reps: 0,
        maxWeight: 0,
      },
    ]);
  };

  const handleChangeExerciseInput = (keyId, field, value) => {
    setExercisesInWorkOut((old) =>
      old.map((item) => {
        if (item.keyId === keyId) {
          return { ...item, [field]: +value };
        }
        return { ...item };
      })
    );
  };

  const handleCreateWorkout = (vars) => {
    setExercisesInWorkOut([]);
    createWorkoutMutation(vars);
  };

  const handleRemove = (keyId) => {
    setExercisesInWorkOut((old) => old.filter((item) => item.keyId !== keyId));
  };

  if (loading) console.log("Loading");
  if (error) console.log(error.message);

  return (
    <div className="main--container">
      <div className="profile--page">
        <div className="halhpage-big">
          <SecondaryNavigation>
            <h2>Your exercises library</h2>
            <DropDown
              classes="small-dd"
              options={BODY_PARTS_LIST}
              title="All exercises"
              handleChange={setBodyPartFilter}
              selectedValue={bodyPartFilter}
            />
          </SecondaryNavigation>
          <div className="standart-list">
            {data ? (
              data.exercises
                .filter(
                  (item) =>
                    !bodyPartFilter || bodyPartFilter === item.targetBodyPart
                )
                .map((item) => {
                  return (
                    <Exercise
                      key={item._id}
                      exercise={item}
                      handleDelete={deleteExerciseMutation}
                      handleUpdate={updateExersiceMutation}
                      handleSelect={handleSelect}
                    />
                  );
                })
            ) : (
              <Spiner />
            )}
          </div>
        </div>
        <div className="halhpage-small">
          <CreateExerciseForm
            makeRequest={creatExerciseMutation}
            requestInputName="createExerciseInput"
            title="Create new Exercise"
          />
          <CreateWorkoutForm
            exercises={exercisesInWorkOut}
            handleChange={handleChangeExerciseInput}
            handleCreate={handleCreateWorkout}
            handleRemove={handleRemove}
          />
        </div>
      </div>
    </div>
  );
};

export default ExercisesPage;
