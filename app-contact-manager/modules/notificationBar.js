// grab from dom
const notificationBar = document.querySelector('.notification-bar');

// addMessage
export const addMessage = (messageElement) => {
  clearMessages();

  notificationBar.append(messageElement);
};

// clearMessages
export const clearMessages = () => {
  notificationBar.innerHTML = '';
};

// export default DOM object
export default notificationBar;
