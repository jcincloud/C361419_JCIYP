
using System.Web.Mvc;


namespace DotWeb.Controllers
{
    public class ActivitiesController : WebFrontController
    {
        public ActionResult Activities_list()
        {
            return View();
        }
        public ActionResult Activities_content(int? id)
        {
            using (db0 = getDB0())
            {
                if (id != null)
                {
                    ViewBag.Title = db0.活動花絮主檔.Find(id).標題;
                    ViewBag.Url = Request.Url.AbsoluteUri;
                }
            }
            return View();
        }
    }
}