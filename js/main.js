// Chi mo 1 FAQ item tai mot thoi diem (UX tot hon tren mobile).
// Khong anh huong toi kha nang AI crawl noi dung ben trong <details>,
// vi <details><summary> luon co san trong DOM/HTML tinh, khong can JS de render.
document.addEventListener("DOMContentLoaded", function () {
  var faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (item.open) {
        faqItems.forEach(function (other) {
          if (other !== item) other.open = false;
        });
      }
    });
  });
});
