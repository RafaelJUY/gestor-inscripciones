import {ICourse} from "./ICourse";

export class Course implements ICourse{
  private _id: string;
  private _name: string;
  private _startDate: Date;
  private _endDate: Date;

  constructor(id: string, name: string, startDate: Date, endDate: Date) {
    this._id = id;
    this._name = name;
    this._startDate = startDate;
    this._endDate = endDate;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
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
}
