import {Component, ElementRef, OnInit} from '@angular/core';
import {Task} from '../../models/task.model';
import {TaskService} from '../../service/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = []; // Supongamos que tienes un arreglo de tareas
  filteredTasks: Task[] = []
  selectedCategory: string = 'All'; // Valor inicial

  taskToEdit: Task = {
    id: 0,
    name: '',
    description: '',
    category: '',
    completed: false
  };

  newTask: Task = {
    id: 0, // Inicializa id como un número (puede ser 0 o cualquier otro valor predeterminado)
    name: '',
    description: '',
    category: '',
    completed: false
  };

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.getTasks()
  }

  getTasks() {
    this.taskService.getTasks().subscribe((tasks: Task[]) => {
        this.tasks = tasks;
        this.filteredTasks = [...this.tasks]
      },
      (error) => {
        console.error('Error retrieving tasks:', error);
      });
  }

  sendNewTask() {
    if (!this.newTask.name || !this.newTask.description || !this.newTask.category) {
      alert("Complete all the fields, please");
    } else {
      // Llama al servicio para crear la nueva tarea
      this.taskService.createTask(this.newTask).subscribe(
        () => {
          // Agrega la nueva tarea a la lista de tareas actual
          const taskCopy = {...this.newTask};
          this.tasks.push(taskCopy);
          this.filteredTasks = [...this.tasks]
        },
        (error) => {
          alert("Ocurrió un error al enviar la tarea");
        }
      );
    }
  }

  deleteTask(task: Task | undefined): void {
    if (task && task.id) {
      // Verificas que el registro y su ID no sean undefined
      this.taskService.deleteTask(task.id).subscribe(
        () => {
          this.filteredTasks = this.tasks.filter((t) => t.id !== task.id);
          this.cleanTask(task)
        },
        (error) => {
          console.error('Error al eliminar el registro:', error);
        }
      );
    } else {
      console.error('Invalid register');
    }
  }

  updateTask() {
    if (!this.taskToEdit.name || !this.taskToEdit.description || !this.taskToEdit.category) {
      alert("Complete all the fields, please")
    } else {
      // Llama al servicio para actualizar la tarea
      this.taskService.updateTask(this.taskToEdit).subscribe(
        (result) => {
          // La tarea se actualizó correctamente, puedes manejar la respuesta si es necesario
          console.log('Task updated', result);
        },
        (error) => {
          // Ocurrió un error al actualizar la tarea, maneja el error como desees
          console.error('Error al actualizar la tarea:', error);
        }
      );
    }
  }

  toggleCompletion(task: Task | undefined) {
    if (task) {
      task.completed = !task.completed
      this.taskService.updateTask(task).subscribe(
        (result) => {
          // La tarea se actualizó correctamente, puedes manejar la respuesta si es necesario
          console.log('Task updated:', result);
        },
        (error) => {
          // Ocurrió un error al actualizar la tarea, maneja el error como desees
          console.error('Error al actualizar la tarea:', error);
        }
      );
    }
  }

  // Aplicar el filtro cuando se cambia la búsqueda o la categoría
  selectCategory(category: string) {
    this.selectedCategory = category;
    if (this.selectedCategory === "All") {
      this.filteredTasks = [...this.tasks]
    } else {
      this.filteredTasks = [...this.tasks.filter((t) => t.category === category)];
    }
  }

  // Método para manejar el evento de categoría seleccionada desde TaskFilter
  assignEditTask(task: Task) {
    this.taskToEdit = task
  }

  cleanTask(task: Task) {
    task.id = 0
    task.name = ""
    task.description = ""
    task.category = ""
  }
}
