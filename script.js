const courseLesson = document.querySelectorAll(".course-lessons");
const courseLessonInput = document.querySelectorAll(".course-lessons input");

function grabDataId(el) {
  Array.from(courseLesson).map((element, i) => {
    if (i + 1 === +el) {
      element.style.backgroundColor = "#E3F1F2";
    } else {
      element.style.backgroundColor = "transparent";
    }
  });
}

courseLesson.forEach((lesson) =>
  lesson.addEventListener("click", (e) => {
    if (e.target.checked) {
      grabDataId(e.currentTarget.dataset.id);
    } else {
      e.currentTarget.style.backgroundColor = "transparent";
    }
  })
);

// if(e.currentTarget.classList.contains("course-lessons-red")) {
//   return
// }
