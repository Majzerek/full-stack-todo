export type TodosType = {
  id: string;
  title: string;
  description: string;
  hashTag: string[];
  createAt: Date;
  userDate: Date;
}

export type FormDataType = Omit<TodosType, 'id' | 'createAt'>