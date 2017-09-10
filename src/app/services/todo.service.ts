import { Todo } from './../models/todo';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import * as _ from 'lodash';

@Injectable()
export class TodoService {

  private todoList: Todo[];
  fireBaseURL:string;
  constructor(private http : Http) {
    this.todoList = [];
    this.fireBaseURL='https://mytodoapp-47edf.firebaseio.com/todo';    
    this.getTodoList();
    /* this.todoList.push(new Todo('Learn Angular', false, 'personal'));
    this.todoList.push(new Todo('Fix bug # 3434', false, 'project'));
    this.todoList.push(new Todo('Debug the code', false, 'project'));
    this.todoList.push(new Todo('Attend scrum', false, 'project'));
    this.todoList.push(new Todo('Read a book', false, 'personal'));
    this.todoList.push(new Todo('Do Exercise', false, 'personal')); */
   }

   getTodoList() {
       this.http.get(this.fireBaseURL+'.json')
      .subscribe(respData => { 
        const respObj = respData.json();
        const tempTodoArr = [];
         /* this.todoList = _.values(respObj).map((item: Todo) => {
          return new Todo(item.id,item.name, item.isCompleted, item.type);
        }) */
        this.todoList = Object.keys(respObj)
        .map(key => {
          let obj = respObj[key];
          return new Todo(key, obj.name, obj.isCompleted, obj.type)
        });
      }, (err => {
        console.log('Error in fetching data from Firebase', err);
      }))
   }

   addTodo(name: string, type: string, isDone: boolean = false) {
    const newTodo = new Todo('',name, isDone, type);
    this.http.post(this.fireBaseURL+'.json', newTodo)
    .subscribe(data => {
      this.todoList.push(newTodo); 
     }, (err => {
      console.log('Error occured', err);
    }))
   }

   getProjectTodos() {
     return this.todoList.filter(todo => todo.type === 'project' && !todo.isCompleted);
   }

   getPersonalTodos() {
     return this.todoList.filter(todo => todo.type === 'personal' && !todo.isCompleted);
   }

   getArchivedTodos(){
    return this.todoList.filter(todo => todo.isCompleted);
   }
   markItemAsCompleted(id: string) {
    let todoObj = this.fetchTodoForId(id);
    todoObj.isCompleted = true;
    // this.http.put(this.firebaseURL + '/' + id + '.json', todoObj)
    this.http.put(`${this.fireBaseURL}/${id}.json`, todoObj)
    .subscribe(res => console.log(res));
   }

  fetchTodoForId(id: string) {
    return this.todoList.find(todo => todo.id === id);
  } 
  deleteTodo(id: string) {
    let todoObj = this.fetchTodoForId(id);
    this.http.delete(`${this.fireBaseURL}/${id}.json`,)
    .subscribe(res => {
        console.log(res.json());
        this.getTodoList();
    })
  }
  revertTodo(id: string) {
    let todoObj = this.fetchTodoForId(id);
    todoObj.isCompleted = false;
    this.http.put(`${this.fireBaseURL}/${id}.json`, todoObj)
    .subscribe(res => console.log(res));
   } 
    
    
}
