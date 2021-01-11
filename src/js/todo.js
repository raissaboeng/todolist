const tasks = [];
const addButton = document.querySelector(".addButton");
let input = document.querySelector("#newTask");
const list = document.querySelector("#list");

const editButton = document.querySelector(".editButton");
const removeButton = document.querySelector(".removeButton");

class item{
    constructor (itemName){
        //Create the item div
        this.createDiv(itemName);
    }

    createDiv(itemName){
        //create li element
        let itemBox = document.createElement("li");

        //create input checkbox task
        let checkbox = document.createElement("input");
        checkbox.classList.add("item_checkbox");
        checkbox.type = "checkbox";
        checkbox.id = "item_input";

        //create label for checkbox task
        let itemLabel = document.createElement("label");
        itemLabel.htmlFor = "item_input";
        itemLabel.classList.add("item_input");
        itemLabel.appendChild(document.createTextNode(itemName));

        let editInput = document.createElement("input");
        editInput.type="text";

        //create button edit task with icon
        let buttonEdit = document.createElement("button");
        buttonEdit.classList.add("editButton");
        let imgEdit = document.createElement("img");
        imgEdit.src="./public/images/pen.svg";
        imgEdit.alt="icon_alter";
        buttonEdit.appendChild(imgEdit);
        buttonEdit.addEventListener("click", () => this.editTask(itemBox));
      
        //create button delete task with icon
        let buttonRemove = document.createElement("button");
        buttonRemove.classList.add("removeButton");
        let imgRemove = document.createElement("img");
        imgRemove.src="./public/images/delete.svg";
        imgRemove.alt="icon_delete";
        buttonRemove.appendChild(imgRemove);
        buttonRemove.addEventListener("click", () => this.removeTask(itemBox));
      

        //includes elements in div list
        itemBox.appendChild(checkbox);
        itemBox.appendChild(itemLabel);
        itemBox.appendChild(editInput);
        itemBox.appendChild(buttonEdit);
        itemBox.appendChild(buttonRemove);
        list.appendChild(itemBox);
    }

    editTask(item){
        console.log("Edit Task..."); 
        let editInput = item.querySelector('input[type=text]');
        let label = item.querySelector("label");
        let containsClass = item.classList.contains("editMode");

        let pos = tasks.indexOf(label.innerText);

        //If class of the parent is .editmode
        if(containsClass){
            //switch to .editmode
            //label becomes the inputs value.
            label.innerText = editInput.value;
            tasks[pos] = editInput.value;
        }else{
            editInput.value = label.innerText;
        }
        
        //toggle .editmode on the parent.
        item.classList.toggle("editMode");
    }
    
    removeTask(item){
        let itemRemove = item.querySelector("label").innerText;
        let pos = tasks.indexOf(itemRemove);
        tasks.splice(pos, 1);
        
        list.removeChild(item);
    }
}

function createTask(){
    console.log("Create new task...")
    if(input.value != ""){
        if(tasks.indexOf(input.value)< 0){
            new item(input.value);
            tasks.push(input.value);
            input.value = "";
        }else{
            alert("Esta tarefa já existe!");
        }
    }else{
        alert("Tarefa vazia!");
    }
}
addButton.onclick = createTask;