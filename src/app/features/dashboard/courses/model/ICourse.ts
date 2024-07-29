import {Lesson} from "./Lesson";

export interface ICourse {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  // lessons: Lesson[];
}
