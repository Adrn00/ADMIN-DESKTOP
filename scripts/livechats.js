const chatCards = document.querySelectorAll(".chat-card");
const chatWindow = document.querySelector(".chat-window");
const chatUser = document.getElementById("chat-user");
const closeChat = document.querySelector(".close-chat");

chatCards.forEach(card => {
  card.addEventListener("click", () => {
    const userName = card.dataset.user;
    chatUser.textContent = userName;
    chatWindow.classList.remove("hidden");
  });
});

closeChat.addEventListener("click", () => {
  chatWindow.classList.add("hidden");
});
