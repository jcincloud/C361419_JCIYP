using ProcCore.HandleResult;
using System.Web.Mvc;
namespace DotWeb.Controllers
{
    public class NewsController : WebFrontController
    {
        public ActionResult News_list()
        {
            return View();
        }
        public ActionResult News_content(int? id)
        {
            using (db0 = getDB0())
            {
                if (id != null)
                {
                    ViewBag.Title = db0.最新消息.Find(id).標題;
                    ViewBag.Url = Request.Url.AbsoluteUri;
                }
            }
            return View();
        }


        [HttpPost]
        public string aj_FList(int id, string filekind)
        {
            ReturnAjaxFiles rAjaxResult = new ReturnAjaxFiles();

            rAjaxResult.filesObject = listDocFiles(id, filekind, "News", "News");
            rAjaxResult.result = true;
            return defJSON(rAjaxResult);
        }
    }
}