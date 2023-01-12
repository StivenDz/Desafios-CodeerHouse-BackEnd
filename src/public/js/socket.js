const socket = io("http://localhost:5491");

document.title = "Yazz | Home";

const time = document.getElementById("time");
const logout = document.getElementById("logout");
const root = document.getElementById("root");
let timeRemaining = 60;

const timing = setInterval(async () => {
    timeRemaining--;
    if (timeRemaining < 0) {
        root.insertAdjacentHTML("beforeend", `
            <figure id="modal">
                <div>
                    <h3>See you later ${document.getElementById("userName").innerText}!</h3>
                </div>
            </figure>
        `)
        setTimeout(() => {
            logout.submit();
        }, 2000);
        return clearInterval(timing);
    }

    const hours = (Math.floor(timeRemaining / 0xE10)).toString();
    const minutes = (Math.floor(timeRemaining / 0x3C) % 0x3C).toString();
    const seconds = (Math.round(timeRemaining % 0x3C)).toString();
    time.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

}, 1000);

logout.addEventListener("submit", (e) => {
    e.preventDefault();
    root.insertAdjacentHTML("beforeend", `
            <figure id="modal">
                <div>
                    <h3>See you later ${document.getElementById("userName").innerText}!</h3>
                </div>
            </figure>
        `)
    setTimeout(() => {
        logout.submit();
    }, 2000);
})