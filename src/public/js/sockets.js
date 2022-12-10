const socket = io();

const messageForm = document.getElementById("newMessage");
const userForm = document.getElementById("userForm");
const messages = document.getElementById("messages");
const minimizeButton = document.getElementById("minimize");
const chatContainer = document.getElementById("chatContainer");
const usersConnected = document.getElementById("onLine");
let height = messages.clientHeight;
let userName = "";

socket.on("newConnection",(connecteds)=>{
    document.getElementById("connecteds").innerText = `Active (${connecteds.length})`;
    let html = ``;
    connecteds.map(user =>{
        html += addNewUserConnected(user.userName);
    })
    usersConnected.innerHTML = html;
})

socket.on('newMessage', (data) => {
    messages.insertAdjacentHTML('beforeend', messageRecieve(data));
    scrollDown();
})
userForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const username = e.target.username.value;
    userName = username;
    socket.emit("newUser",username,cb =>{
        if(!cb){
            userForm.reset();
            alert("este usuario ya existe");
        }else{
            document.getElementById("loginContainer").style.display = "none";
        }
    });
})

socket.on("loadMessages",(listOfMessages) =>{
    listOfMessages.map(data => {
        if((data.userName).toLowerCase() === (userName).toLowerCase()){
            messages.insertAdjacentHTML('beforeend', messageSent(data))
            scrollDown();
        }else{
            messages.insertAdjacentHTML('beforeend', messageRecieve(data));
            scrollDown();
        }
    })
})

socket.on("login",(data)=>{
    location.href = "/";
})

minimizeButton.addEventListener("click",()=>{
    if(chatContainer.classList.contains("resetHeigth")){
        chatContainer.classList.remove("resetHeigth");
    }
    chatContainer.style.height = "48px";
    minimizeButton.style.display = "none";
    document.getElementById("headerChat").classList.add("isMinzed");

    setTimeout(()=>{
        chatContainer.addEventListener("click",maximizeHandler)
    },1000);
})

const maximizeHandler = () =>{
    chatContainer.classList.add("resetHeigth");
    minimizeButton.style.display = "flex";
    document.getElementById("headerChat").classList.remove("isMinzed");

    setTimeout(() => {
        chatContainer.removeEventListener("click",maximizeHandler)
    }, 1000);
}

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = e.target.message.value;
    if (!message.length) return;
    socket.emit('messageToSend', message);
    messages.insertAdjacentHTML('beforeend', messageSent({message}))
    scrollDown();
    messageForm.reset();
})

const messageSent = (data) => {
    return `
    <div class="messageContainer sent">
        <div class="messageSent" id="">${data.message}</div>
        <figure>
            <img src="https://scontent.fbga2-1.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=dst-png_p100x100&_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=09DngjdxQjIAX9-Jy7G&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fbga2-1.fna&oh=00_AfC5hOJBNCz8uo3C6zuZ5iBsri8BYCbw5nwPlGdOUg7Uhg&oe=63A5F9B8" >
        </figure>
    </div>
    `;
}

const messageRecieve = (data) => {
    return `
        <div class="messageContainer recieved">
            <div class="messageRecieved"" id="">${data.message}</div>
            <figure>
                <img src="https://scontent.fbga2-1.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=dst-png_p100x100&_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=09DngjdxQjIAX9-Jy7G&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fbga2-1.fna&oh=00_AfC5hOJBNCz8uo3C6zuZ5iBsri8BYCbw5nwPlGdOUg7Uhg&oe=63A5F9B8" >
                <span>${data.userName}</span>
            </figure>
        </div>
    `;
}

const addNewUserConnected = (name) => {
    return `
    <div class="userOnline">
        <div>
            <div>
                <figure>
                    <img src="/images/user.png" alt="">
                    <span></span>
                </figure>
                <span>${name == userName ? name+ " (Me)" : name}</span>
            </div>
        </div>
    </div>
    
    `
}

const scrollDown = () => {
    height += 200;
    messages.scrollTo({
        top: height,
        behavior: "smooth"
    })
}

function submitOnEnter(event) {
    if (event.which === 13) {
        event.target.form.dispatchEvent(new Event("submit", { cancelable: true }));
        event.preventDefault();
    }
}
document.getElementById("message").addEventListener("keypress", submitOnEnter);