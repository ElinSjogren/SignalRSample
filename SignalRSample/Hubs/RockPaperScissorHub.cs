using Microsoft.AspNetCore.SignalR;

namespace SignalRSample.Hubs
{
    public class RockPaperScissorHub :Hub
    {
        public Dictionary<string, int> GetRaceStatus()
        {
            return StaticDetails.RockPaperScissorRace;
        }

    }
}
