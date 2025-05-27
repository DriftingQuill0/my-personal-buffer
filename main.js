const postForm = document.getElementById("postForm");
const contentInput = document.getElementById("content");
const timeInput = document.getElementById("scheduleTime");
const platformSelect = document.getElementById("platform");
const calendarEl = document.getElementById("calendar");
const dashboard = document.getElementById("dashboard");
const authDiv = document.getElementById("auth");

let posts = JSON.parse(localStorage.getItem("scheduledPosts") || "[]");

function savePosts() {
  localStorage.setItem("scheduledPosts", JSON.stringify(posts));
}

function renderCalendar() {
  if (window.calendar) {
    window.calendar.removeAllEvents();
    window.calendar.addEventSource(posts.map(post => ({
      title: `${post.platform}: ${post.content.slice(0, 20)}...`,
      start: post.time,
    })));
  }
}



postForm.addEventListener("submit", e => {
  e.preventDefault();
  const post = {
    content: contentInput.value,
    platform: platformSelect.value,
    time: timeInput.value,
  };
  posts.push(post);
  savePosts();
  renderCalendar();
  postForm.reset();
});

// Initialize Calendar
document.addEventListener("DOMContentLoaded", () => {
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay"
    },
    events: []
  });
  window.calendar = calendar;
  calendar.render();

  // Load saved posts
  if (posts.length) {
    renderCalendar();
  }
});
