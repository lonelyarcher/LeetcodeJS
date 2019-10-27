const acc = document.getElementsByClassName("accordion");
for (let a of acc) {
    a.addEventListener("click", e => {
        e.target.classList.toggle("active");
        const panel = e.target.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
} 