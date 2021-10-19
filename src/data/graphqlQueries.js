import { gql } from "@apollo/client";

export const LOGIN_QUERY = gql`
  query Login($loginLoginInput: LoginInput) {
    login(loginInput: $loginLoginInput) {
      name
      token
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($createUserInput: UserInput) {
    createUser(userInput: $createUserInput)
  }
`;

export const EXERCISES = gql`
  query Exercises {
    exercises {
      _id
      name
      targetBodyPart
      targetMuscle
      __typename
    }
  }
`;

export const EXERCISES_SIDEBAR = gql`
  query Exercises {
    exercises {
      _id
      name
    }
  }
`;

export const CREATE_EXERCISE = gql`
  mutation CreateExercise($createExerciseInput: ExerciseInput) {
    createExercise(exerciseInput: $createExerciseInput) {
      _id
      name
      targetBodyPart
      targetMuscle
      __typename
    }
  }
`;

export const UPDATE_EXERCISE = gql`
  mutation UpdateExercise(
    $updateExerciseId: String!
    $updateExerciseExerciseInput: ExerciseInput
  ) {
    updateExercise(
      id: $updateExerciseId
      exerciseInput: $updateExerciseExerciseInput
    ) {
      _id
      name
      targetBodyPart
      targetMuscle
      __typename
    }
  }
`;

export const DELETE_EXERCISE = gql`
  mutation DeleteExercise($deleteExerciseId: String!) {
    deleteExercise(id: $deleteExerciseId) {
      _id
      name
      targetBodyPart
      targetMuscle
      __typename
    }
  }
`;

export const WORKOUTS = gql`
  query Workouts {
    workouts {
      _id
      date
      length
      details {
        sets
        reps
        maxWeight
        _id
        exercise {
          _id
          name
          targetBodyPart
          targetMuscle
        }
      }
    }
  }
`;

export const CREATE_WORKOUT = gql`
  mutation CreateWorkout($createWorkoutWorkoutInput: WorkoutInput) {
    createWorkout(workoutInput: $createWorkoutWorkoutInput) {
      _id
      date
      length
      details {
        _id
      }
    }
  }
`;

export const DELETE_WORKOUT = gql`
  mutation DeleteWorkout($deleteWorkoutId: String!) {
    deleteWorkout(id: $deleteWorkoutId) {
      _id
      date
    }
  }
`;
