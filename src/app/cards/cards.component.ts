import { Component, OnInit, Input } from '@angular/core';
import { TodoService } from './../services/todo.service';
import { Todo } from './../models/todo';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  @Input() todo: Todo;
  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }
  
  delete(id) {
    this.todoService.deleteTodo(id);
  }
  revert(id) {
     this.todoService.revertTodo(id);
  }
}


