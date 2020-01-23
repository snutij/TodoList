import { Component, Injectable, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.css']
})
export class ToggleButtonComponent implements OnInit {
  label: string;
  checked$: Observable<boolean>;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.label = 'Move done items at the end?';
    this.checked$ = this.taskService.getChecked();
  }

  sortList(): void {
    this.taskService.toggleChecked();
    this.taskService.sortList();
  }

}
