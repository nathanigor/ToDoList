import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public mode = 'list';
  public todos: Todo[] = [];
  public title: String = 'To Do List';
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])],
      date: ['', Validators.compose([
        Validators.minLength(8),
        Validators.maxLength(10),
      ])]
    });

    this.load();
  }

  add() {
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    const date = this.form.controls['date'].value;
    this.todos.push(new Todo(id, title, false, date))
    this.save();
    this.clear();
    this.mode = 'list'
  }

  clear() {
    this.form.reset();
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo)
    if(index != -1){
      this.todos.splice(index, 1)
      this.save();

    }
  }

  markAsDone(todo: Todo) {
    todo.done = true
    this.save();

  }

  markAsUnDone(todo: Todo) {
    todo.done = false
    this.save();

  }

  save() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data)
  }

  load() {
    const data = localStorage.getItem('todos');
    this.todos = JSON.parse(data!);
  }

  changeMode(mode: string) {
    this.mode = mode;
  }

}
