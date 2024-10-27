using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalRSample.Hubs;
using SignalRSample.Models;
using System.Diagnostics;

namespace SignalRSample.Controllers
{
    public class HomeController : Controller
    {    
    
        private readonly ILogger<HomeController> _logger;
        private readonly IHubContext<RockPaperScissorHub> _rockPaperScissor;

        public HomeController(ILogger<HomeController> logger,
            IHubContext<RockPaperScissorHub> rockPapperScissor)
        {
            _logger = logger;
            _rockPaperScissor = rockPapperScissor;
        }

        public IActionResult Index()
        {
            return View();
        }
        public async Task<IActionResult> RockPaperScissorRace(string vote)
        {
            if (StaticDetails.RockPaperScissorRace.ContainsKey(vote))
            {
                StaticDetails.RockPaperScissorRace[vote]++;

            }
            await _rockPaperScissor.Clients.All.SendAsync("updateRockPaperScissor", vote, StaticDetails.RockPaperScissorRace[vote]);


            return Redirect("/Home");
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
