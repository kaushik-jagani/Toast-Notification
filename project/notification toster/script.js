const buttons = document.querySelectorAll(".buttons .btn");
const notification = document.querySelector(".notifications");

const toastDetails = {
  timer: 5000,
  success: {
    icon: "fa-circle-check",
    text: "Success : This is a success toast.",
  },
  error: {
    icon: "fa-circle-xmark",
    text: "Error : This is a error toast.",
  },
  warning: {
    icon: "fa-circle-exclamation",
    text: "Warning : This is a warning toast.",
  },
  info: {
    icon: "fa-circle-info",
    text: "Info : This is a information toast.",
  },
};

const removeToast = (toast) => {
  //add class in li element in dynamic html.
  toast.classList.add("hide");
  setTimeout(() => toast.remove(), 500);
};

const createToast = (id) => {
  const { icon, text } = toastDetails[id];
  const toast = document.createElement("li");
  toast.className = `toast ${id}`;
  toast.innerHTML = `<div class="column">
   <i class="fa-solid ${icon}"></i>
   <span>${text}</span>
    </div>
    <i class="fa-solid fa-xmark" onclick ="removeToast(this.parentElement)"></i>`;
  notification.appendChild(toast);

  setTimeout(() => removeToast(toast), toastDetails.timer);
};

buttons.forEach((btn) => {
  btn.addEventListener("click", () => createToast(btn.id));
});
