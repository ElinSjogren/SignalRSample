//create connection at a url location
var connectionUserCount = new signalR.HubConnectionBuilder()
    .withUrl("/hubs/userCount", signalR.HttpTransportType.WebSockets)
    .build();


// connect to methods th at hub invokes aka recive notifications from the hub :D
connectionUserCount.on("updateTotalViews", (value) => {
    var newCountSpan = document.getElementById("totalViewsContainer");
    newCountSpan.innerText = value.toString();
});

connectionUserCount.on("updateTotalUsers", (value) => {
    var newCountSpan = document.getElementById("totalUsersContainer");
    newCountSpan.innerText = value.toString();
});

//invoke hub methods aka send notafikation to hub
function newWindowLoadedOnClient() {
    connectionUserCount.invoke("NewWindowLoaded", "This video").then((value) => console.log(value));
};


//start the connection
function fulfilled() {
    console.log("Connection to userhub was Sccessful");
    newWindowLoadedOnClient();
}
function rejected() {

}


connectionUserCount.start().then(fulfilled, rejected);