function toNewNotification (){
  window.location.href = "../pages/new-notification.html";
}
function toNewHabit (){
  window.location.href = "../pages/new-habit.html";
}
function toSignIn (){
  window.location.href = "../pages/sign-in.html";
}
function toLogIn (){
  window.location.href = "../pages/log-in.html";
}
function toAllHabits (){
  window.location.href = "../pages/all-habits.html";
}
function toPlanned (){
  window.location.href = "../pages/planned.html";
}
function toProgress (){
  window.location.href = "../pages/progress.html";
}
function toAllNotifications (){
  window.location.href = "../pages/all-notifications.html";
}
function toToday (){
  window.location.href = "../pages/today.html";
}

function handleSubmit(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (email === "user" && password === "user") {
      window.location.href = "pages/templete.html";
  } else {
      alert("Неправильний логін або пароль.");
  }
}

function done(){
  
}