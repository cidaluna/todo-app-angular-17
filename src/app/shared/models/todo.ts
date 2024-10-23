import { ITodoType } from "../components/todo-card/todo-card.component";

export interface ITodo{
  id?: number,
  title: string,
  description: string,
  status: ITodoType,
  created_at?: string,
  updated_at?: string,
}
