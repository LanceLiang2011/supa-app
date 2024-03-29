export interface Todo extends TodoWithoutId {
  id: number;
  inserted_at: string;
}

export interface TodoWithoutId {
  user_id: string;
  task: string;
  is_completed: boolean;
}
