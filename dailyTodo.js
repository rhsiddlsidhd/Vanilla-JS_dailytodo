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

//전체 또는 개인 체크박스
const totalCheckBtn = () => {
  const allChecked = taskInputList.every((it) => it.isComplete);

  taskInputList.forEach((it) => {
    it.isComplete = !allChecked;
    const checkbox = document.getElementById(it.id);
    if (checkbox) {
      checkbox.checked = it.isComplete;
    }
  });
};

const toggleComplete = (id) => {
  const taskToUpdate = taskInputList.find((it) => it.id === id);

  if (taskToUpdate) {
    taskToUpdate.isComplete = !taskToUpdate.isComplete;
    const allChecked = taskInputList.every((it) => it.isComplete);

    if (totaltaskBtn) {
      totaltaskBtn.checked = allChecked;
    }
  }
};

taskInputBtn.addEventListener("click", taskInputAddBtn);
totaltaskBtn.addEventListener("click", totalCheckBtn);

//추가버튼
function taskInputAddBtn() {
  taskInputList.forEach((task) => {
    task.isComplete = false;
  });

  let taskContent = taskInput.value;
  let randomId = generalRandomId();
  let newTask = { id: randomId, content: taskContent, isComplete: false };
  taskInputList.push(newTask);
  render();
}

//render
const render = () => {
  let resultHTML = ``;

  const allChecked = taskInputList.every((it) => it.isComplete);
  if (totaltaskBtn) {
    totaltaskBtn.checked = allChecked;
  }

  for (let i = 0; i < taskInputList.length; i++) {
    resultHTML += `<div class="task-items">
  <div class="checkicon-box">
    <label for="${taskInputList[i].id}" >
      <input
        type="checkbox"
        id=${taskInputList[i].id}
        name="checkboxGroup"
        class="checkicon"
        onClick ="toggleComplete('${taskInputList[i].id}')"
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

//랜덤ID생성
const generalRandomId = () => {
  return "_" + Math.random().toString(36).substr(2, 9);
};

//********************************************* */
