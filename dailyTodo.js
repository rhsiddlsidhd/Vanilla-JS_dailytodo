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
//전체리스트
let taskInputList = [];
let selectedIds = [];

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
    <button onclick="singlePostDelete('${taskInputList[i].id}')">삭제</button>
  </div>
</div>`;
  }
  document.querySelector(".task-items-box").innerHTML = resultHTML;
};

//랜덤ID생성
const generalRandomId = () => {
  return "_" + Math.random().toString(36).substr(2, 9);
};

/**
 * 단일 삭제
 */
function singlePostDelete(id) {
  const newTaskInputList = taskInputList.filter((it) => {
    return it.id !== id;
  });
  taskInputList = newTaskInputList;
  render();
  //전체체크 업데이트
  if (totaltaskBtn) {
    totaltaskBtn.checked = false;
  }
}

/**
 * 선택 삭제
 * 1. 선택된 아이템(id)들을 전부 배열로 받아둔다
 *    => 전체 리스트에서 반복문을 통해 새로운 배열을 생성
 *    => 조건은 isComplete = true 인 Id값만 가져오기
 * 2. 해당 배열을 제외한 나머지 id값들로 list를 새롭게 재선언한다
 * 3. 새롭게 선언한것으로 render한다
 */

function handleMultiDelete() {
  if (taskInputList.length <= 0) {
    alert("삭제할 항목이 없습니다.");
    return;
  }

  selectedIds = taskInputList.filter((it) => it.isComplete).map((it) => it.id);
  console.log("선택", selectedIds);
  const updatedTaskInputList = taskInputList.filter(
    (task) => !selectedIds.includes(task.id)
  );
  taskInputList = updatedTaskInputList;
  console.log("최종", taskInputList);
  render();

  //전체체크 업데이트
  if (totaltaskBtn) {
    totaltaskBtn.checked = false;
  }
}
/**
 * 전체 삭제
 */

function totalDelete() {
  if (taskInputList.length <= 0) {
    alert("삭제할 항목이 없습니다.");
    return;
  }
  const confirmed = window.confirm("정말 다 삭제하시겠습니까?");
  if (confirmed) {
    taskInputList = [];
    render();

    //전체체크 업데이트
    if (totaltaskBtn) {
      totaltaskBtn.checked = false;
    }
  }
}
