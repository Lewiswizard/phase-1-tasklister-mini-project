document.addEventListener("DOMContentLoaded", () => {
  // your code here

  const form = document.querySelector("#create-task-form");
  const taskList = document.querySelector("#tasks");
  const tasks = []
  form.addEventListener("submit", (e) => {
    e.preventDefault()
    const task = e.target["new-task-description"].value;
    const dueDate= e.target["due-date"].value
    const urgencyLevel = e.target["urgency-level"].value
    addItemToList(tasks, task, dueDate, urgencyLevel)

    tasks.sort((a, b) => b.urgencyLevel - a.urgencyLevel) //
    console.log(tasks);
    addItemToDom(tasks)
    e.target.reset();
  })
  function addRemoveBtn(li){
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", (event) => {
      const currentLi = event.target.parentElement
      removeTask(currentLi)
    });
    li.appendChild(removeBtn);
  }
  function removeTask(li) {
    let task = li.querySelector('span.task').innerText
    console.log(li);
    let index=tasks.findIndex(task => task.task === task)
    tasks.splice(index,1)
    li.remove();
  }
  function addItemToList(list, task, dueDate, urgencyLevel){
    const taskObj = {
      task,
      dueDate,
      urgencyLevel
    }
    list.push(taskObj)
  }
  function addItemToDom(list){
    taskList.innerHTML ="";
    list.forEach(task => {
      const li = document.createElement("li");
      for(const property in task){
        const span = document.createElement("span");
        span.classList.add("task-info")
        span.classList.add(property)
        span.textContent = `${property}: ${task[property]}`
        li.appendChild(span)
      }
      addRemoveBtn(li);
      taskList.appendChild(li);
    })
  
  }
});