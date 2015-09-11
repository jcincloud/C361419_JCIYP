using DotWeb.CommSetup;
using ProcCore.HandleResult;
using System;
using System.IO;
using System.Web.Mvc;

namespace DotWeb.Areas.Sys_Active.Controllers
{
    public class DocumentController : BaseController
    {
        #region Action and function section
        public ActionResult Main()
        {
            ActionRun();
            return View();
        }

        #endregion
        #region ajax call section

        public string aj_Init()
        {
            using (var db0 = getDB0())
            {
                return defJSON(new
                {
                    // options_equipment_category = db0.Equipment_Category.OrderBy(x=>x.sort)
                });
            }
        }
        #endregion
        #region ajax file section
        [HttpPost]
        public string aj_FUpload(int id, string filekind, string filename)
        {
            ReturnAjaxFiles rAjaxResult = new ReturnAjaxFiles();
            #region
            string tpl_File = string.Empty;
            try
            {
                //附帶檔案
                if (filekind == "File1")
                    handleFileSave(filename, id, ImageFileUpParm.NewsBasicSingle, filekind, "DocManage", "DocManage");

                rAjaxResult.result = true;
                rAjaxResult.success = true;
                rAjaxResult.FileName = filename;
            }
            catch (LogicError ex)
            {
                rAjaxResult.result = false;
                rAjaxResult.success = false;
                rAjaxResult.error = getRecMessage(ex.Message);
            }
            catch (Exception ex)
            {
                rAjaxResult.result = false;
                rAjaxResult.success = false;
                rAjaxResult.error = ex.Message;
            }
            #endregion
            return defJSON(rAjaxResult);
        }

        [HttpPost]
        public string aj_FList(int id, string filekind)
        {
            ReturnAjaxFiles rAjaxResult = new ReturnAjaxFiles();

            rAjaxResult.filesObject = listDocFiles(id, filekind, "DocManage", "DocManage");
            rAjaxResult.result = true;
            return defJSON(rAjaxResult);
        }

        [HttpPost]
        public string aj_FDelete(int id, string filekind, string filename)
        {
            ReturnAjaxFiles rAjaxResult = new ReturnAjaxFiles();
            DeleteSysFile(id, filekind, filename, ImageFileUpParm.NewsBasicSingle, "DocManage", "DocManage");
            rAjaxResult.result = true;
            return defJSON(rAjaxResult);
        }


        [HttpGet]
        public FileResult aj_FDown(int id, string filekind, string filename)
        {
            string path_tpl = string.Format("~/_Upload/{0}/{1}/{2}/{3}/{4}", "DocManage", "DocManage", id, filekind, filename);
            string server_path = Server.MapPath(path_tpl);
            FileInfo file_info = new FileInfo(server_path);
            FileStream file_stream = new FileStream(server_path, FileMode.Open, FileAccess.Read);
            string web_path = Url.Content(path_tpl);
            return File(file_stream, "application/*", file_info.Name);
        }
        #endregion
    }
}