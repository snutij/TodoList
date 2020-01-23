import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../task';
import { TASK } from '../mock-tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks$: BehaviorSubject<Task[]>;
  private checked$: BehaviorSubject<boolean>;

  constructor() {
    this.tasks$ = new BehaviorSubject(TASK);
    this.checked$ = new BehaviorSubject(false);
  }

  getTasks(): Observable<Task[]> {
    return this.tasks$.asObservable();
  }

  getChecked(): Observable<boolean> {
    return this.checked$.asObservable();
  }

  toggleChecked(): void {
    this.checked$.next(!this.checked$.value);
  }

  addTask(description: string): void {
    const id = this.tasks$.value.length ? Math.max(...this.tasks$.value.map(task => task.id)) + 1 : 0;
    this.tasks$.value.push({ id,  description, done: false } as Task);
    this.sortList();
  }

  deleteTask(id: number): void {
    this.tasks$.next(
      this.tasks$.value.filter(task => task.id !== id)
    );
  }

  toggleStatusTask(id: number): void {
    const tasks = this.tasks$.value.map(task => {
      if (task.id === id) {
        return {
          ...task,
          done: !task.done,
        };
      }
      return task;
    });
    this.tasks$.next(tasks);
    this.sortList();
  }

  sortList(): void {
    if (this.checked$.value) {
      const doneTasks = this.tasks$.value
        .filter(task => task.done)
        .sort((previous, current) => previous.id - current.id);
      const undoneTasks = this.tasks$.value
        .filter(task => !task.done)
        .sort((previous, current) => previous.id - current.id);
      this.tasks$.next([...undoneTasks, ...doneTasks]);
    } else {
      const tasksById = this.tasks$.value.sort((previous, current) => previous.id - current.id);
      this.tasks$.next([...tasksById]);
    }
  }
}
