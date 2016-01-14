
using ProcCore.Business.DB0;
using System.Collections.Generic;
using System.IO;
using System.Linq;
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
            活動花絮主檔 items;
            using (db0 = getDB0())
            {
                bool Exist = db0.活動花絮主檔.Any(x => x.流水號 == id && x.顯示狀態Flag);

                if (id == null || !Exist)
                {
                    return Redirect("~/Activities/Activities_list");
                }
                else
                {
                    #region get content data
                    items = db0.活動花絮主檔.Find(id);
                    items.IContext = db0.活動花絮內容
                        .Where(x => x.主檔流水號 == id)
                        .OrderByDescending(x => x.排序)
                        .Select(x => new 活動花絮內容L
                        {
                            流水號 = x.流水號,
                            標題 = x.標題,
                            活動日期 = x.活動日期,
                            顯示狀態Flag = x.顯示狀態Flag,
                            相簿連結 = x.相簿連結,
                            排序 = (float)x.排序
                        }
                        ).ToList();
                    string tplPath = "~/_Upload/Activities/ActivitiesDetail";
                    var imgPath = HttpContext.Server.MapPath(tplPath);
                    foreach (var item in items.IContext)
                    {
                        var imgIdPath = imgPath + "\\" + item.流水號;
                        if (Directory.Exists(imgIdPath))
                        {
                            var getFiles = Directory.EnumerateFiles(imgIdPath)
                                .Where(x => x.EndsWith("jpg") || x.EndsWith("jpeg") || x.EndsWith("png"));
                            IList<string> collectFile = new List<string>();

                            foreach (var file in getFiles)
                            {
                                FileInfo fileInfo = new FileInfo(file);
                                collectFile.Add(Url.Content(tplPath + "\\" + item.流水號 + "\\" + fileInfo.Name));
                            }

                            if (Directory.Exists(imgIdPath + "\\Photo1"))
                            {
                                getFiles = Directory.EnumerateFiles(imgIdPath + "\\Photo1")
                                    .Where(x => x.EndsWith("jpg") || x.EndsWith("jpeg") || x.EndsWith("png"));

                                foreach (var file in getFiles)
                                {
                                    FileInfo fileInfo = new FileInfo(file);
                                    collectFile.Add(Url.Content(tplPath + "\\" + item.流水號 + "\\Photo1\\" + fileInfo.Name));
                                }
                            }
                            item.imgsrcs = collectFile.ToList();
                        }
                    }
                    ViewBag.Title = items.標題;
                    ViewBag.Url = Request.Url.AbsoluteUri;
                    #endregion
                }
            }
            return View(items);
        }
    }
}