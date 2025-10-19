const openEditProfile = document.getElementById("openEditProfile");
const editProfileModal = document.getElementById("editProfileModal");
const closeEditProfile = document.getElementById("closeEditProfile");

const openChangePass = document.getElementById("openChangePass");
const changePassModal = document.getElementById("changePassModal");
const closeChangePass = document.getElementById("closeChangePass");

const openInbox = document.getElementById("openInbox");
const inboxModal = document.getElementById("inboxModal");
const closeInbox = document.getElementById("closeInbox");

openEditProfile.onclick = () => (editProfileModal.style.display = "flex");
closeEditProfile.onclick = () => (editProfileModal.style.display = "none");

openChangePass.onclick = () => (changePassModal.style.display = "flex");
closeChangePass.onclick = () => (changePassModal.style.display = "none");

openInbox.onclick = () => (inboxModal.style.display = "flex");
closeInbox.onclick = () => (inboxModal.style.display = "none");

window.onclick = (e) => {
  [editProfileModal, changePassModal, inboxModal].forEach((modal) => {
    if (e.target === modal) modal.style.display = "none";
  });
};

const openAbout = document.getElementById("openAbout");
const aboutModal = document.getElementById("aboutModal");
const closeAbout = document.getElementById("closeAbout");

openAbout.onclick = () => (aboutModal.style.display = "flex");
closeAbout.onclick = () => (aboutModal.style.display = "none");


const openSystemConfig = document.getElementById("openSystemConfig");
const systemConfigModal = document.getElementById("systemConfigModal");
const closeSystemConfig = document.getElementById("closeSystemConfig");

openSystemConfig.onclick = () => (systemConfigModal.style.display = "flex");
closeSystemConfig.onclick = () => (systemConfigModal.style.display = "none");


const openActivityLog = document.getElementById("openActivityLog");
const activityLogModal = document.getElementById("activityLogModal");
const closeActivityLog = document.getElementById("closeActivityLog");

openActivityLog.onclick = () => (activityLogModal.style.display = "flex");
closeActivityLog.onclick = () => (activityLogModal.style.display = "none");
