using ProcCore.Business.DB0;
using ProcCore.HandleResult;
using System.Linq;
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
            文件管理 item;
            using (db0 = getDB0())
            {
                bool Exist = db0.文件管理.Any(x => x.流水號 == id && x.顯示狀態Flag);

                if (id == null || !Exist)
                {
                    return Redirect("~/Doc/Doc_list");
                }
                else
                {
                    item = db0.文件管理.Find(id);

                    item.fileList = listDocFiles(item.流水號, "file1", "DocManage", "DocManage");

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

            rAjaxResult.filesObject = listDocFiles(id, filekind, "DocManage", "DocManage");
            rAjaxResult.result = true;
            return defJSON(rAjaxResult);
        }
    }
}