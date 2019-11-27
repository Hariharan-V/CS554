const io = require('socket.io-client');
const usernameForm = document.getElementById("usernameForm");
const usernameField = document.getElementById("username");
const usernameSubmitField = document.getElementById("usernameSubmit");
let username = null;
let chat = document.getElementById("chat");
const searchForm = document.getElementById("search");
const searchQuery = document.getElementById("searchQuery");
const searchMessage = document.getElementById("message");
const searchSubmit = document.getElementById("searchSubmit");
const messageBox = document.getElementById("messageBox");
const socket = io("http://localhost:3000/chat");

const addMessage = (user,URL,message)=>{
    const m = document.createElement("div");
    m.className = "messageElement";
    m.appendChild(document.createElement("h3").appendChild(document.createTextNode(`User:${user} message:${message}`)));
    const mContent = document.createElement("div");
    mContent.className = "messageContent";
    if(URL.length==0){
        
    }else{
        URL.forEach(url=>{
            let img = document.createElement("img");
            img.src = url;
            img.alt = "Image for message: "+message;
            mContent.appendChild(img)
        });
    }
    if(URL.length!=0){
        m.appendChild(mContent);
    }
    messageBox.appendChild(m);
};
usernameForm.onsubmit = function(e){
    // console.log(e);
    e.preventDefault();
    // console.log(usernameField.value);
    if(usernameField.value===""||usernameField.value.split(" ").length==0){
        return false;
    }
    username = usernameField.value;
    usernameField.disabled = true;
    usernameSubmitField.disabled = true;
    chat.style.display = "block";
    return false;
}
searchForm.onsubmit = function(e){
    e.preventDefault();
    if(searchQuery.value===""||searchQuery.value.split(" ").length==0){
        return false;
    }
    searchSubmit.disabled = true;
    socket.emit('query&message',{query: searchQuery.value, 
                                message:searchMessage.value,
                                user: username }); 
    console.log("message sent");
    
}
socket.on('query&message',obj=>{
    console.log(obj);
    searchQuery.value = "";
    searchMessage.value = "";
    searchSubmit.disabled = false;
});
socket.on('chat_message',(obj)=>{
    console.log("message  recieved");
    addMessage(obj.user,obj.URL,obj.message);
});





