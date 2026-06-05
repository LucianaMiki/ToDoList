import { useEffect, useState } from "react";
import {Text, KeyboardAvoidingView, Platform} from "react-native";
import { Input } from "@/components/Input";
import { List } from "@/components/List";
import { taskService } from "@/services/TaskService";
import { Task } from "@/types/Task";
import { LinearGradient } from "expo-linear-gradient";
import Toast from "react-native-toast-message";

export default function Index() {

  const [tasks, setTasks] = useState<Task[]>([]);

  //adicionar nova task
  async function handleAddTask(title: string) {
    if (!title.trim()) {
      return;
    }

    const task = await taskService.create({
      title,
      completed: false,
    });

    setTasks((prev) => [...prev, task]);

    Toast.show({
      type: "success",
      text1: "New task added!",
      text2: "Your new task was added",
    });
  }

  //deletar uma task
  async function handleDeleteTask(id: number) {
    await taskService.delete(id);

    setTasks((prev) =>
      prev.filter((task) => task.id !== id)
    );

    Toast.show({
      type: "error",
      text1: "Task removed!",
    });
  }

  //editar uma task
  async function handleUpdateTask(task: Task) {
    const updatedTask = await taskService.update(task);

    setTasks((prev) =>
      prev.map((t) =>
        t.id === updatedTask.id
          ? updatedTask
          : t
      )
    );

    Toast.show({
      type: "info",
      text1: "Task updated!",
    });
  }

  //busca a lista total de tasks
  useEffect(() => {
    async function loadTasks() {
      const data = await taskService.getAll();
      setTasks(data);
    }

    loadTasks();
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
        <LinearGradient
          colors={[
            "#120c8d",
            "#0b0947",
            "#040116"
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{
            flex: 1,
            paddingHorizontal: 24,
            maxWidth: 700,
            width: "100%",
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 40,
              fontWeight: "bold",
              marginBottom: 30,
              marginTop: 60
            }}
          >
            To Do List
          </Text>

          <Input
            placeholder="Add a new text!"
            onSubmit={handleAddTask}
          />

          <List
            tasks={tasks}
            onDelete={handleDeleteTask}
            onEdit={handleUpdateTask}
          />
        </LinearGradient>
    </KeyboardAvoidingView>
  );
}