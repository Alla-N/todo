export default interface Itodo {
  _id: string;
  userId: string;
  title: string;
  completed: boolean;
  deadline: Date;
  priority: string;
}
