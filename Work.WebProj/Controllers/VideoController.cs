using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DotWeb.WebApp.Controllers
{
    public class VideoController : WebFrontController
    {
        // GET: Video
        public ActionResult Video()
        {
            return View("Video");
        }
    }
}