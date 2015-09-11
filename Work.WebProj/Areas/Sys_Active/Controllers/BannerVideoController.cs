using DotWeb.CommSetup;
using DotWeb.WebApp;
using ProcCore.Business;
using ProcCore.HandleResult;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace DotWeb.Areas.Sys_Active.Controllers
{
    public class BannerVideoController : BaseController
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
        #region ajax image file upload section
        [HttpPost]
        public string aj_FUpload(int id, string filekind, string fileName)
        {
            ReturnAjaxFiles rAjaxResult = new ReturnAjaxFiles();
            #region
            string tpl_File = string.Empty;
            try
            {
                //廣告圖 4張
                if (filekind == "Photo1")
                    handleImageSave(fileName, id, ImageFileUpParm.BannerRotator, filekind, "Banner", "Banner");

                rAjaxResult.result = true;
                rAjaxResult.success = true;
                rAjaxResult.FileName = fileName;
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

            rAjaxResult.filesObject = listImgFiles(id, filekind, "Banner", "Banner");
            rAjaxResult.result = true;
            return defJSON(rAjaxResult);
        }
        [HttpPost]
        public string aj_FDelete(int id, string filekind, string filename)
        {
            ReturnAjaxFiles rAjaxResult = new ReturnAjaxFiles();
            DeleteSysFile(id, filekind, filename, ImageFileUpParm.BannerRotator, "Banner", "Banner");
            rAjaxResult.result = true;
            return defJSON(rAjaxResult);
        }

        [HttpPost]
        public string aj_FSort(int id, string filekind, IList<JsonFileInfo> file_object)
        {
            ReturnAjaxFiles rAjaxResult = new ReturnAjaxFiles();
            rewriteJsonFile(id, filekind, "Banner", "Banner", file_object);
            rAjaxResult.result = true;
            return defJSON(rAjaxResult);
        }

        #endregion
    }
}