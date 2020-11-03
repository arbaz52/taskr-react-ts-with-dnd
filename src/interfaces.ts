export interface Task {
    title: string;
    body: string;
    added_at: Date;
}
export interface Column {
    title: string;
    tasks: string[];
}
export interface Tasks {
    [key: string]: Task,
}
export interface Columns {
    [key: string]: Column
}
export interface State {
    tasks: Tasks,
    columns: Columns
}