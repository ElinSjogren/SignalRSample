let lbl_subscribeJoined = document.getElementById("lbl_subscribeJoined");

let btn_un_rock = document.getElementById("btn_un_rock");
let btn_un_paper = document.getElementById("btn_un_paper");
let btn_un_scissor = document.getElementById("btn_un_scissor");

let btn_rock = document.getElementById("btn_rock");
let btn_paper = document.getElementById("btn_paper");
let btn_scissor = document.getElementById("btn_scissor");

let trigger_rock = document.getElementById("trigger_rock");
let trigger_paper = document.getElementById("trigger_paper");
let trigger_scissor = document.getElementById("trigger_scissor");

// event listeners
btn_rock.addEventListener("click", (e) => {
    connectionSubscribe.send("JoinSubscription", "Rock");
    e.preventDefault();
})
btn_paper.addEventListener("click", (e) => {
    connectionSubscribe.send("JoinSubscription", "Paper");
    e.preventDefault();
})
btn_scissor.addEventListener("click", (e) => {
    connectionSubscribe.send("JoinSubscription", "Scissor");
    e.preventDefault();
})
btn_un_rock.addEventListener("click", (e) => {
    connectionSubscribe.send("QuitSubscription", "Rock");
    e.preventDefault();
})
btn_un_paper.addEventListener("click", (e) => {
    connectionSubscribe.send("QuitSubscription", "Paper");
    e.preventDefault();
})
btn_un_scissor.addEventListener("click", (e) => {
    connectionSubscribe.send("QuitSubscription", "Scissor");
    e.preventDefault();
})

//create connection at a url location
var connectionSubscribe = new signalR.HubConnectionBuilder()
    .withUrl("/hubs/subscribe")
    .build();

connectionSubscribe.on("SubscriptionGroupStatus", (stringGroupJoined, subscriptionName, hasSubscribed) => {
    lbl_subscribeJoined.innerText = stringGroupJoined;

    if (hasSubscribed) {
        switch (subscriptionName) {
            case "Rock":
                btn_rock.style.display = "none";
                btn_un_rock.style.display = "";
                break;
            case "Paper":
                btn_paper.style.display = "none";
                btn_un_paper.style.display = "";
                break;
            case "Scissor":
                btn_scissor.style.display = "none";
                btn_un_scissor.style.display = "";
                break;
            default:
                break;
        }
        toastr.success(`Y'all in the sub with ${subscriptionName}`);
    } else {
        switch (subscriptionName) {
            case "Rock":
                btn_rock.style.display = "";
                btn_un_rock.style.display = "none";
                break;
            case "Paper":
                btn_paper.style.display = "";
                btn_un_paper.style.display = "none";
                break;
            case "Scissor":
                btn_scissor.style.display = "";
                btn_un_scissor.style.display = "none";
                break;
            default:
                break;
        }
        toastr.warning(`Y'all out of ${subscriptionName}`);
    }
});

connectionSubscribe.on("newSubscriberAdded", (subscriptionName) => {
    toastr.info(`Someone just joined ${subscriptionName}`)
})
connectionSubscribe.on("subscriberRemoved", (subscriptionName) => {
    toastr.info(`Someone just un joined ${subscriptionName}`)
})

//start the connection
function fulfilled() {
    console.log("Connection to subscribe was Sccessful");
}
function rejected() {

}


connectionSubscribe.start().then(fulfilled, rejected);