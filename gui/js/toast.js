
const icons = {
  success: 'fa-circle-check',
  error: 'fa-circle-xmark',
  warning: 'fa-triangle-exclamation',
  info: 'fa-circle-info'
}

const removeToast = (toast) => {
    toast.classList.add("hide");
    if(toast.timeoutId) clearTimeout(toast.timeoutId); // Clearing the timeout for the toast
    setTimeout(() => toast.remove(), 500); // Removing the toast after 500ms
}

const setToastAlert = (content="",appearance="warning") => {
    const toast = document.createElement("li"); // Creating a new 'li' element for the toast
    toast.className = `toast ${appearance}`; // Setting the classes for the toast
    // Setting the inner HTML for the toast
    toast.innerHTML = `<div class="column">
                         <i class="fa-solid ${icons[appearance]}"></i>
                         <span>${content}</span>
                      </div>
                      <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
    NOTIFICATIONS.appendChild(toast); // Append the toast to the notification ul
    // Setting a timeout to remove the toast after the specified duration
    toast.timeoutId = setTimeout(() => removeToast(toast), 5000);
}


// setToastAlert("Testing toast alert" ,"success");
// setToastAlert("Testing toast alert","error");
// setToastAlert("Testing toast alert","warning");
// setToastAlert("Testing toast alert","info");
