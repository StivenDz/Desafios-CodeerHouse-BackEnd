const socket = io.connect();

const paginate = (newDirection) => {
    const container = document.getElementById(`carouselProductListContainer`);
    container.scrollLeft+= newDirection;
};

const next = document.getElementById("next");
const prev = document.getElementById("prev");

next.addEventListener("click",()=>paginate(240 * 5));
prev.addEventListener("click",()=>paginate(-240 * 5));