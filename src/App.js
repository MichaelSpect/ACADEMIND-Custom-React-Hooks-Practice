import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useRequest from "./components/hooks/use-request";

function App() {
  const [tasks, setTasks] = useState([]);
  const sendRequestConfig = {
    url: "https://react-learn-http-65e9f-default-rtdb.firebaseio.com/tasks.json",
  };

  const httpData = useRequest();
  const { isLoading, error, sendRequest: fetchTasks } = httpData;

  useEffect(() => {
    const transformTasks = (taskObj) => {
      const loadedTasks = [];
      for (const taskKey in taskObj) {
        loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
      }
      setTasks(loadedTasks);
    };

    fetchTasks(sendRequestConfig, transformTasks);
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
