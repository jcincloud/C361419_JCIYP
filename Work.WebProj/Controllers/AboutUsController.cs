
using System.Web.Mvc;


namespace DotWeb.Controllers
{
    public class AboutUsController : WebFrontController
    {
        public ActionResult Index()
        {
            return View("AboutUs");
        }
        public ActionResult TaiwanJC()
        {
            return View();
        }
        public ActionResult AboutUs()
        {
            return View();
        }
        [Route("AboutUs/Director")]
        public ActionResult Director_48()
        {
            return View();
        }
        [Route("AboutUs/Director/47")]
        public ActionResult Director_47()
        {
            return View();
        }
        [Route("AboutUs/Director/46")]
        public ActionResult Director_46()
        {
            return View();
        }
        public ActionResult Director_45()
        {
            return View();
        }
        public ActionResult Director_44()
        {
            return View();
        }
        public ActionResult Director_43()
        {
            return View();
        }
        public ActionResult Director_42()
        {
            return View();
        }
        public ActionResult Director_41()
        {
            return View();
        }
        public ActionResult Pre_President()
        {
            return View();
        }
        public ActionResult Pre_OB()
        {
            return View();
        }
        public ActionResult Senator()
        {
            return View();
        }
        
    }
}
