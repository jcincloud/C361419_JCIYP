using DotWeb.CommSetup;
using DotWeb.WebApp;
using ProcCore.Business;
using ProcCore.HandleResult;
using System;
using System.Linq;
using System.Web.Mvc;

namespace DotWeb.Areas.Sys_Active.Controllers
{
    public class MemberDataController : BaseController
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
        public string aj_FUpload(int id, string filekind, string fileName)
        {
            ReturnAjaxFiles rAjaxResult = new ReturnAjaxFiles();
            #region
            string tpl_File = string.Empty;
            try
            {
                //會員大頭
                if (filekind == "Photo1")
                    handleImageSave(fileName, id, ImageFileUpParm.Member, "Photo1", "Member", "Member");
                //產品
                if (filekind == "Photo2")
                    handleImageSave(fileName, id, ImageFileUpParm.Product, "Photo1", "Member", "Product");
                //會員公司
                if (filekind == "Photo3")
                    handleImageSave(fileName, id, ImageFileUpParm.Company, "Photo1", "Member", "Company");

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

            if (filekind == "Photo1")
                rAjaxResult.filesObject = listImgFiles(id, "Photo1", "Member", "Member");

            if (filekind == "Photo2")
                rAjaxResult.filesObject = listImgFiles(id, "Photo1", "Member", "Product");

            if (filekind == "Photo3")
                rAjaxResult.filesObject = listImgFiles(id, "Photo1", "Member", "Company");

            rAjaxResult.result = true;
            return defJSON(rAjaxResult);
        }

        [HttpPost]
        public string aj_FDelete(int id, string filekind, string filename)
        {
            ReturnAjaxFiles rAjaxResult = new ReturnAjaxFiles();
            if (filekind == "Photo1")
                DeleteSysFile(id, "Photo1", filename, ImageFileUpParm.NewsBasicSingle, "Member", "Member");

            if (filekind == "Photo2")
                DeleteSysFile(id, "Photo1", filename, ImageFileUpParm.NewsBasicSingle, "Member", "Product");

            if (filekind == "Photo3")
                DeleteSysFile(id, "Photo1", filename, ImageFileUpParm.NewsBasicSingle, "Member", "Company");

            rAjaxResult.result = true;
            return defJSON(rAjaxResult);
        }
        #endregion
    }
}