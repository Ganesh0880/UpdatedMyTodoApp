import { TodoService } from './../services/todo.service';
import { Todo } from './../models/todo';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private todoService: TodoService) {
    
   }

  ngOnInit() {
    //this.todoService.getTodoList();
  }

  addItemToList(todoText: string, type: string) {
    //console.log(todoText, type);
    this.todoService.addTodo(todoText, type);
  }
  markItemAsDone(id: string) {
     this.todoService.markItemAsCompleted(id);
  }
}
