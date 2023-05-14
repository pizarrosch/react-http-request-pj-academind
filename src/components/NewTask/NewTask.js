import { useState } from 'react';

import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttpRequest from "../../custom-hooks/use-http-request";

const NewTask = (props) => {
  const {isLoading, error, sendRequest: sendTaskRequest} = useHttpRequest();

  const createData = (taskText, taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  }

  const enterTaskHandler = (taskText) => {
    sendTaskRequest(
      {
        url: 'https://react-http-requests-app-bac9a-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { text: taskText }
      },
      createData.bind(null, taskText)
    )
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
