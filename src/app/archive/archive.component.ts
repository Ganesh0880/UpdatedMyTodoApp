import { Component, OnInit } from '@angular/core';
import { TodoService } from './../services/todo.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    // this.todoService.getTodoList();
  }


}
