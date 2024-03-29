import { Todo, TodoWithoutId } from "./interfaces";
import { supabase } from "./supabase";

export const getTodos = async () => {
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .order("inserted_at", { ascending: false });
  if (error) throw new Error("Error fetch Data");
  return data;
};

export const addTodo = async (todo: string) => {
  try {
    const { data } = await supabase.auth.getUser();
    if (!data.user) throw new Error("No user session");
    const uid = data.user.id;
    const newTodo: TodoWithoutId = {
      user_id: uid,
      task: todo,
      is_completed: false,
    };
    await supabase.from("todos").insert(newTodo).select().single();
  } catch (error: any) {
    throw error;
  }
};

export const deleteTodo = async (id: number) => {
  const { data, error } = await supabase.from("todos").delete().eq("id", id);
  if (error) throw new Error("Fail deleting");
  return data;
};

export const toggleComplete = async (todo: Todo) => {
  const { data, error } = await supabase
    .from("todos")
    .update({ is_completed: !todo.is_completed })
    .eq("id", todo.id);
  if (error) throw error;
  return data;
};
