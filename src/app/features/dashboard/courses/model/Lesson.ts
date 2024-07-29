export class Lesson{
  private _idCourse: number;
  private _date: Date;
  private _topic: string;
  private _startTime: number;
  private _endTime: number;


  constructor(idCourse: number, date: Date, topic: string, startTime: number, endTime: number) {
    this._idCourse = idCourse;
    this._date = date;
    this._topic = topic;
    this._startTime = startTime;
    this._endTime = endTime;
  }

  get idCourse(): number {
    return this._idCourse;
  }

  set idCourse(value: number) {
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
