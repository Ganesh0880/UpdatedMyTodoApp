export class Todo {
    id:string;
    name: string;
    isCompleted: boolean;
    type: string;

    constructor(id:string, name: string, isDone: boolean, type: string) {
        this.id = id;
        this.name = name;
        this.isCompleted = isDone;
        this.type = type;
    }
}