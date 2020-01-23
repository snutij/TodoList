import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-formadd',
  templateUrl: './formadd.component.html',
  styleUrls: ['./formadd.component.css']
})
export class FormaddComponent implements OnInit {
  addForm: FormGroup;
  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder) {
    this.addForm = this.formBuilder.group({
      task: ['']
    });
  }

  ngOnInit() {}
  addTask(description: string): void {
    this.taskService.addTask(description);
    this.addForm.get('task').reset();
  }

}
