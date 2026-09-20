document.addEventListener("DOMContentLoaded", function () {
  var tabs = document.querySelectorAll(".tabs a[href^='#']");
  if (!("IntersectionObserver" in window) || !tabs.length) return;

  var byId = {};
  tabs.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      tabs.forEach(function (a) { a.classList.remove("active"); });
      var tab = byId[entry.target.id];
      if (!tab) return;
      tab.classList.add("active");
      tab.scrollIntoView({ block: "nearest", inline: "center" });
    });
  }, { rootMargin: "-100px 0px -60% 0px" });

  Object.keys(byId).forEach(function (id) {
    var el = document.getElementById(id);
    if (el) observer.observe(el);
  });
});
