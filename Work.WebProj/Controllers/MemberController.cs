using System.Web.Mvc;

namespace DotWeb.Controllers
{
    public class MemberController : WebFrontController
    {
        public ActionResult Member()
        {
            return View();
        }
        public ActionResult Member_content()
        {
            return View();
        }
    }
}