﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DotWeb.WebApp.Controllers
{
    public class JljcController : WebFrontController
    {
        // GET: Event
        public ActionResult Index()
        {
            return View("jc2016");
        }
        public ActionResult jc2016()
        {
            return View();
        }
    }
}