// color
const whiteColor = "#FFFBF5";
const primaryColor = "#C3ACD0";
const secondColor = "#F7EFE5";
const pointColor = "#6643DB";

/**
 *
 */

const taskInput = document.getElementById("taskInput");
const taskInputBtn = document.getElementById("taskInputBtn");
const totaltaskBtn = document.getElementById("totaltask");
const taskInputList = [];

const totalCheckBtn = () => {
  // 모든 체크박스의 상태를 확인
  const allChecked = taskInputList.every((task) => task.isComplete);

  // 모든 체크박스의 상태를 반전
  taskInputList.forEach((task) => {
    task.isComplete = !allChecked;
    const checkbox = document.getElementById(task.id);
    if (checkbox) {
      checkbox.checked = task.isComplete;
    }
  });
};

taskInputBtn.addEventListener("click", taskInputAddBtn);
totaltaskBtn.addEventListener("click", totalCheckBtn);

function taskInputAddBtn() {
  let taskContent = taskInput.value;
  let randomId = generalRandomId();
  let newTask = { id: randomId, content: taskContent, isComplete: false };

  taskInputList.push(newTask);
  console.log(taskInputList);
  render();
}

const render = () => {
  let resultHTML = ``;
  for (let i = 0; i < taskInputList.length; i++) {
    resultHTML += `<div class="task-items">
  <div class="checkicon-box">
    <label for="${taskInputList[i].id}" onClick ="toggleComplete('${
      taskInputList[i].id
    }')">
      <input
        type="checkbox"
        id=${taskInputList[i].id}
        name="checkboxGroup"
        class="checkicon"
        ${taskInputList[i].isComplete ? "checked" : ""}
    /></label>
  </div>
  <div class="task">
    <div>${taskInputList[i].content}</div>
  </div>
  <div class="update">
    <button>수정</button>
  </div>
  <div class="delete">
    <div></div>
  </div>
</div>`;
  }
  document.querySelector(".task-items-box").innerHTML = resultHTML;
};

const generalRandomId = () => {
  return "_" + Math.random().toString(36).substr(2, 9);
};

const toggleComplete = (id) => {
  for (let i = 0; i < taskInputList.length; i++) {
    if (taskInputList[i].id == id) {
      taskInputList[i].isComplete = !taskInputList[i].isComplete;
      break;
    }
  }
};
