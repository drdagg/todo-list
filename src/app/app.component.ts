import {Component, OnInit} from '@angular/core';
import {HttpService} from './http.service';
import {Model} from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpService]
})
export class AppComponent implements OnInit {

  tasks: any;
  selectedTask: Model;
  changeTask: boolean;

  constructor(private httpService: HttpService) {
  }

  ngOnInit() {
    return this.httpService.getTasks().subscribe(data => this.tasks = data);
  }

  add(action: string): void {
    action = action.trim();
    if (!action) {
      return;
    }
    this.httpService.addTask({action} as Model).subscribe(data => this.tasks.push(data));
  }

  delete(model: Model): void {
    this.tasks = this.tasks.filter(m => m !== model);
    this.httpService.deleteTask(model).subscribe();
  }

  onSelect(task: Model): void {
    this.selectedTask = task;
    this.changeTask = true;
  }

  back() {
    this.changeTask = !this.changeTask;
  }

  save(): void {
    this.httpService.updateTask(this.selectedTask).subscribe(() => this.back());
  }

  done() {
    this.selectedTask.done = !this.selectedTask.done;
  }
}
