import {ICourse} from "./ICourse";
import {Lesson} from "./Lesson";

export class Course implements ICourse{
  private _id: number;
  private _name: string;
  private _startDate: Date;
  private _endDate: Date;
  private _lessons: Lesson[];

  constructor(id: number, name: string, startDate: Date, endDate: Date) {
    this._id = id;
    this._name = name;
    this._startDate = startDate;
    this._endDate = endDate;
    this._lessons = [];
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get startDate(): Date {
    return this._startDate;
  }

  set startDate(value: Date) {
    this._startDate = value;
  }

  get endDate(): Date {
    return this._endDate;
  }

  set endDate(value: Date) {
    this._endDate = value;
  }

  get lessons(): Lesson[] {
    return this._lessons;
  }

  set lessons(value: Lesson[]) {
    this._lessons = value;
  }
}
