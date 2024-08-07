import {ILesson} from "./ILesson";

export class Lesson implements ILesson{
  private _id?: string;
  private _idCourse: string;
  private _date: Date;
  private _topic: string;
  private _startTime: number;
  private _endTime: number;


  /*constructor(idCourse: string, date: Date, topic: string, startTime: number, endTime: number) {
    this._idCourse = idCourse;
    this._date = date;
    this._topic = topic;
    this._startTime = startTime;
    this._endTime = endTime;
  }
*/
  constructor(idCourse: string, date: Date, topic: string, startTime: number, endTime: number);
  constructor(id: string, idCourse: string, date: Date, topic: string, startTime: number, endTime: number);
  constructor(idOrIdCourse: string, idCourseOrDate: Date | string, dateOrTopic: Date | string, topicOrStartTime: string | number, startTimeOrEndTime: number, endTime?: number) {
    if (typeof endTime === 'undefined') {
      // Constructor sin _id
      this._idCourse = idOrIdCourse;
      this._date = idCourseOrDate as Date;
      this._topic = dateOrTopic as string;
      this._startTime = topicOrStartTime as number;
      this._endTime = startTimeOrEndTime;
    } else {
      // Constructor con _id
      this._id = idOrIdCourse;
      this._idCourse = idCourseOrDate as string;
      this._date = dateOrTopic as Date;
      this._topic = topicOrStartTime as string;
      this._startTime = startTimeOrEndTime;
      this._endTime = endTime;
    }
  }


  get id(): string | undefined {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get idCourse(): string {
    return this._idCourse;
  }

  set idCourse(value: string) {
    this._idCourse = value;
  }

  get date(): Date {
    return this._date;
  }

  set date(value: Date) {
    this._date = value;
  }

  get topic(): string {
    return this._topic;
  }

  set topic(value: string) {
    this._topic = value;
  }

  get endTime(): number {
    return this._endTime;
  }

  set endTime(value: number) {
    this._endTime = value;
  }

  get startTime(): number {
    return this._startTime;
  }

  set startTime(value: number) {
    this._startTime = value;
  }
}
