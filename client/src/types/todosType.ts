export type TodosType = {
  id: string;
  title: string;
  description: string;
  hashTag: string[];
  createAt: Date;
  userDate: Date;
  isDone: boolean;
};

export type FormDataType = Omit<TodosType, "id" | "createAt" | "isDone">;
