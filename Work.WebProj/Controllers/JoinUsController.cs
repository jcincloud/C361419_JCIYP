﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DotWeb.WebApp.Controllers
{
    public class JoinUsController : WebFrontController
    {
        // GET: JoinUs
        public ActionResult Index()
        {
            return View("JoinUs");
        }
    }
}