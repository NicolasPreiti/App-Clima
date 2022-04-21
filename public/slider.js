const show = document.getElementById("show");
const fragment = document.createDocumentFragment();

/* CREACION DE IMAGENES */
const images = ["slider/new_york.jpg","slider/dubai.jpg","slider/china.jpg"]

const cont = images.length;
show.style.width = `${cont}00%`;

for (var i = 0 ; i < images.length ; i++) {
    let div = document.createElement("DIV");
    div.classList.add("main-slider__show__item");
    div.style.backgroundImage = `url(${images[i]})`;
    fragment.appendChild(div);
}

show.appendChild(fragment);

/* SLIDER AUTOMATICO */
setInterval(() => {
    let first = show.firstElementChild;
    show.style.transition = "margin-left 1.5s";
    show.style.marginLeft = "-100%";

    setTimeout(() => {
        show.style.transition = "margin-left 0s";
        show.style.marginLeft = "0%";
        show.insertAdjacentElement("beforeend", first);
    }, 1500);
}, 10000);