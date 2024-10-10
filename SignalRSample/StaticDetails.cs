
//to store all the constants in the application
// almost like store?


namespace SignalRSample
{
    public class StaticDetails
    {
        static StaticDetails()
        {
            RockPaperScissorRace = new Dictionary<string, int>();
            RockPaperScissorRace.Add(Rock, 0);
            RockPaperScissorRace.Add(Paper, 0);
            RockPaperScissorRace.Add(Scissor, 0);

        }
        public const string Rock = "Rock";
        public const string Paper = "Paper";
        public const string Scissor = "Scissor";
        public static Dictionary<string, int> RockPaperScissorRace;

    }
}
