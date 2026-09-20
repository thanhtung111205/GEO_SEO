document.addEventListener("DOMContentLoaded", function () {
  var faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (!item.open) return;
      faqItems.forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });

  var links = document.querySelectorAll(".toc a[href^='#']");
  if (!("IntersectionObserver" in window) || !links.length) return;

  var byId = {};
  links.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      links.forEach(function (a) { a.classList.remove("active"); });
      var link = byId[entry.target.id];
      if (link) link.classList.add("active");
    });
  }, { rootMargin: "-80px 0px -65% 0px" });

  Object.keys(byId).forEach(function (id) {
    var el = document.getElementById(id);
    if (el) observer.observe(el);
  });
});
