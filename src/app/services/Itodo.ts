export default interface Itodo {
  id: string;
  userId: string;
  title: string;
  completed: boolean;
  deadline: Date;
  priority: string;
}
