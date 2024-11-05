using Microsoft.AspNetCore.SignalR;

namespace SignalRSample.Hubs
{
    public class SubscriptionsHub : Hub
    {
        public static List<string> SubscriptionsJoined { get; set; } =new List<string>();
        public async Task JoinSubscription(string subscriptionName)
        {
            if (!SubscriptionsJoined.Contains(Context.ConnectionId+":"+subscriptionName))
            {
                SubscriptionsJoined.Add(Context.ConnectionId + ":" + subscriptionName);
                string subList = "";
                foreach (var subscription in SubscriptionsJoined) {
                    if (subscription.Contains(Context.ConnectionId))
                    {
                        subList += subscription.Split(':')[1]+" ";
                    }
                }
                await Clients.Others.SendAsync("newSubscriberAdded", subscriptionName);
                await Clients.Caller.SendAsync("SubscriptionGroupStatus", subList, subscriptionName, true);
                await Groups.AddToGroupAsync(Context.ConnectionId, subscriptionName);
            }
        }
        public async Task QuitSubscription(string subscriptionName)
        {
            if (SubscriptionsJoined.Contains(Context.ConnectionId + ":" + subscriptionName))
            {
                SubscriptionsJoined.Remove(Context.ConnectionId + ":" + subscriptionName);
                string subList = "";
                foreach (var subscription in SubscriptionsJoined)
                {
                    if (subscription.Contains(Context.ConnectionId))
                    {
                        subList += subscription.Split(':')[1] + " ";
                    }
                }
                await Clients.Others.SendAsync("subscriberRemoved", subscriptionName);
                await Clients.Caller.SendAsync("SubscriptionGroupStatus", subList, subscriptionName, false);
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, subscriptionName);
            }
        }
        public async Task TriggerNotification(string subscriptionName)
        {
            await Clients.Group(subscriptionName).SendAsync("triggerNotification", subscriptionName);
        }
    }
}
