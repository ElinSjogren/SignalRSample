//create connection at a url location
var connectionRockPaperScissor = new signalR.HubConnectionBuilder()
    .withUrl("/hubs/rockPaperScissor")
    .build();


// connect to methods th at hub invokes aka recive notifications from the hub :D
connectionRockPaperScissor.on("updateRockPaperScissor", (voteValue, number) => {
    var voteSpan = document.getElementById(`${voteValue}Counter`);
    voteSpan.innerText = number.toString();
});



//start the connection
function fulfilled() {
    console.log("Connection to Rock'PaperScissor was Sccessful");
    connectionRockPaperScissor.invoke("GetRaceStatus").then(raceListWithCurrentValues => {
        console.log( raceListWithCurrentValues , typeof(raceListWithCurrentValues) )
        Object.keys(raceListWithCurrentValues).forEach(key => {
            var voteSpan = document.getElementById(`${key}Counter`);
            voteSpan.innerText = raceListWithCurrentValues[key].toString();
            console.log(raceListWithCurrentValues[key], key);
        })
    })
}
function rejected() {

}


connectionRockPaperScissor.start().then(fulfilled, rejected);