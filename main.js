class Item {
    render(text, parent) {
        const li = document.createElement("li");

        li.innerHTML = `
         <button class="remove-todo"><i class="fa fa-times" aria-hidden="true"></i></button>
         <span>${text}</span>
         <button class="toggle-todo"><i class="fas fa-check" aria-hidden="true"></i> </button>`

        li.querySelector(".remove-todo").onclick = e => {
            let target = e.target.closest("li");
            this._delItem(target);
        }

        li.querySelector(".toggle-todo").onclick = e => {
            let target = e.target.closest("button");
            target.classList.add("completed-todo");

            this._completed(target.closest("li"));
        }

        parent.appendChild(li);
        return li;
    }

    _delItem(target) {
        todo.delItem(target);
    }

    _completed(item) {
        todo.completedTodo.push(item);
    }
}


class Todo {
    constructor(data) {
        this.data = {
            parent: document.querySelector(".todos-list"),
            button: document.querySelector("#add"),
            todos: []
        }
        this.completedTodo = [];
    }

    addItem(text) {
        if (text == "") return;

        const item = new Item();
        const newTodo = item.render(text, this.data.parent);

        this.data.todos.push(newTodo);
    }

    delItem(target) {
        this.data.todos = this.data.todos.filter(item => item !== target);
        this.completedTodo = this.completedTodo.filter(item => item !== target);

        target.remove();
    }

    filterAll() {
        this.data.parent.innerHTML = "";

        this.data.todos.forEach(element => {
            this.data.parent.appendChild(element);
        });
    }

    filterCompleted() {
        this.data.parent.innerHTML = "";

        this.completedTodo.forEach(element => {
            this.data.parent.appendChild(element);
        });
    }

    filterProcess() {
        this.data.parent.innerHTML = "";

        this.data.todos.forEach(element => {
            this.completedTodo.includes(element) ? element : this.data.parent.appendChild(element);
        });
    }
}


const todo = new Todo();

todo.data.button.addEventListener("click", (e) => {
    const target = e.target.closest("#add");
    e.preventDefault();

    const textTodo = document.getElementById("text");
    todo.addItem(textTodo.value);

    textTodo.value = "";
})