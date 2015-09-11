using ProcCore.HandleResult;
using System.Web.Mvc;
namespace DotWeb.Controllers
{
    public class DocController : WebFrontController
    {
        public ActionResult Doc_list()
        {
            return View();
        }
        public ActionResult Doc_content(int? id)
        {
            using (db0 = getDB0())
            {
                if (id != null) {
                    ViewBag.Title = db0.文件管理.Find(id).標題;
                    ViewBag.Url = Request.Url.AbsoluteUri;
                }
            }
            return View();
        }
        [HttpPost]
        public string aj_FList(int id, string filekind)
        {
            ReturnAjaxFiles rAjaxResult = new ReturnAjaxFiles();

            rAjaxResult.filesObject = listDocFiles(id, filekind, "DocManage", "DocManage");
            rAjaxResult.result = true;
            return defJSON(rAjaxResult);
        }
    }
}