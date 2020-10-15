//this list stores all the properties of the task
var todo_list = [];

//function to add a task
function addItem() {
    var val = document.querySelector("#inp").value;
    if (val != "") {
        var todo_item = {}; //Item Object
        todo_item.description = val;
        todo_item.status = "incomplete"; //Initial Status of the task
        todo_list.push(todo_item);
    } else {
        alert("Input is Empty!!");
    }

    //Creating a list element
    var li = document.createElement("li");
    var des_span = document.createElement("span");
    var des = document.createTextNode(todo_item.description);
    li.value = val;
    //Making the input element empty
    document.querySelector("#inp").value = "";
    des_span.appendChild(des);
    des_span.className = "task";
    li.appendChild(des_span);
    li.id = todo_list.length - 1;

    //Animation effects
    setTimeout(function() {
        li.className = li.className + "show";
    }, 10);


    //Adding a close symbol to the list
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    //Adding a edit symbol
    var edit = document.createElement("SPAN");
    var txt_edit = document.createTextNode("Edit")
    edit.className = "edit";
    edit.appendChild(txt_edit);
    li.appendChild(edit);

    //Adding a checkbox
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className += "checkbox-status";
    li.appendChild(checkbox);

    //Finally adding the list element to html
    document.querySelector("#listItem").appendChild(li);

    //Binding eventListeners to the buttons 
    span.addEventListener("click", deleteItem, false);
    edit.addEventListener("click", editItem, false);
    checkbox.addEventListener("change", changeStatus, false);
    des_span.addEventListener("click",alertTask,false);
    //Shift the focus to the input after adding the item
    document.querySelector("#inp").focus();
    console.log(todo_list);
}

//Close functionality
function deleteItem() {
    var li = this.parentNode;
    if (li.status == "edit") {
        alert("You can't delete this Task.It is in edit mode");
    } else {
        var ul_items = document.getElementsByTagName("li");
        var ul = li.parentNode;
        var itemIndex = li.id;
        todo_list.splice(itemIndex, 1);
        ul.removeChild(li);
    }
    var task_length = document.getElementById("listItem").getElementsByTagName("li").length;
    for( var i=0;i<task_length;i++){
        document.getElementsByTagName("li")[i].id = i;
    }
}

//Edit Functionality
function editItem() {
    var item = this.parentNode;
    var button = document.getElementById("btn");
    var listitem = document.getElementById(item.id);
    var inputText = document.getElementById("inp");
    var ifchecked = document.getElementsByClassName("checkbox-status");

   //the action on enter key must be based on the mode of the task
   //if the task is in edit mode it invokes editItem
   //else it invokes addItem

    if(button.innerHTML != "Done"){
         //This check is to prevent from editing an task that is marked as completed
        if(!ifchecked[item.id].checked){
            item.status = "edit";
        inputText.value = todo_list[item.id].description;
        button.innerHTML = "Done";
        inputText.focus();

        function editedItem() {

            //After editing the item..
            button.innerHTML = "Add";
            if (inputText.value != '') {
                var new_span = document.createElement("span");
                var newInputText = document.createTextNode(inputText.value);
                new_span.appendChild(newInputText);
                new_span.className = "task";
                todo_list[item.id].description = inputText.value;

                //replace the list text with new Text
                listitem.childNodes[0].replaceWith(new_span);
                button.onclick = addItem;
                inputText.value = '';
                item.status = 'incomplete'
                console.log(item.status);
            } else {
                var ul = listitem.parentNode;
                ul.removeChild(listitem);
                 var task_length = document.getElementById("listItem").getElementsByTagName("li").length;
                 for( var i=0;i<task_length;i++){
                     document.getElementsByTagName("li")[i].id = i;
                 }
                alert("Task Deleted!");
            }
        };

        //Changing button behavior for editing
        button.onclick = editedItem;
        console.log(item.status);

        window.editedItem =  editedItem;
        }else{//if the task is marked as completed
            alert("Completed Tasks can't be edited.Please mark as incompelte to edit");
        }
    }else{
        //if a task is already in edit mode
        alert("Please complete previous edit action!");
    }

}

// To mark an item as complete or incomplete
function changeStatus() {
    var items = this.parentNode;
    var task_description = document.getElementsByClassName("task");
    var check = document.getElementsByClassName("checkbox-status");
        if (check[items.id].checked) {
            todo_list[items.id].status = "complete";
            task_description[items.id].style.textDecoration = "line-through";
            console.log(todo_list[items.id].status);

        } else {
            items.className = "show"; //Setting back to the previous state
            todo_list[items.id].status = "incomplete";
            task_description[items.id].style.textDecoration = "none";
            console.log(todo_list[items.id].status);
        }
}

function alertTask(){
        var alert_list = this.parentNode;
        alert(todo_list[alert_list.id].description);

}
//When pressing "enter" key,the button behavior is based on the status of the task
var button_action =document.getElementById("btn");
document.getElementById("inp").addEventListener("keyup",function(event){
    if(event.keyCode === 13 && button_action.innerHTML == "Add"){
        addItem();
    }
    else if(event.keyCode === 13 && button_action.innerHTML == "Done"){
        editedItem();
    }
    else{
        //do nothing
    }
});