using ProcCore.Business.DB0;
using ProcCore.HandleResult;
using System.Linq;
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
            最新消息 item;
            using (db0 = getDB0())
            {
                bool Exist = db0.最新消息.Any(x => x.流水號 == id && x.顯示狀態Flag);

                if (id == null || !Exist)
                {
                    return Redirect("~/News/News_list");
                }
                else
                {
                    item = db0.最新消息.Find(id);

                    item.fileList = listDocFiles(item.流水號, "file1", "News", "News");

                    ViewBag.Title = item.標題;
                    ViewBag.Url = Request.Url.AbsoluteUri;
                }

            }
            return View(item);
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