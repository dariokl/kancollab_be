import { connect } from "http2";
import db from "../../utils/db";

interface INewTask {
  id: string;
  description: string;
  title: string;
  assignee: string;
  priority: number;
}

interface IUpdateTaskSection {
  updateId: string;
  taskId: string;
}
export const createTask = (data: INewTask) => {
  const { id, ...formData } = data;

  return db.task.create({ data: { sectionId: id, ...formData } });
};

export const updateTaskSection = (data: IUpdateTaskSection) => {
  return db.task.update({
    where: { id: data.taskId },
    data: { sectionId: data.updateId },
  });
};
