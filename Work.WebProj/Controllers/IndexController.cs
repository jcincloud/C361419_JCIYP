using System.Linq;
using System.Web.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Text;
using System.IO;
using System;
using System.Collections.Generic;
using System.Net.Mail;
using ProcCore.HandleResult;
using DotWeb.CommSetup;
namespace DotWeb.Controllers
{
    public class IndexController : WebFrontController
    {
        public ActionResult Index()
        {
            ViewBag.IsFirstPage = true;
            //string jsonstr = "{id:1,name:'ABC',member:[{title:'Hello',date:'2010-1-1'},{title:'Hi',date:'2012-10-1'}]}";
            //var bjson = JsonConvert.DeserializeObject<abc>(jsonstr);
            //var o = JObject.Parse(jsonstr);
            //Console.Write(o);
            return View();
        }
        public string ajaxSendMail(JoinUsMail md)
        {
            ResultInfo r = new ResultInfo();
            try
            {
                MailMessage mms = new MailMessage();
                mms.From = new MailAddress(md.email, md.name);
                mms.Subject = string.Format(Resources.Res.Info_Mail_Title_JoinUs, md.name);

                foreach (var str in CommWebSetup.MailToList)
                {
                    var m = str.Split(':');
                    if (m.Length == 2)
                    {
                        mms.To.Add(new MailAddress(m[1], m[0]));
                    }
                    else if (m.Length == 1)
                    {
                        mms.To.Add(new MailAddress(m[0]));
                    }
                }

                mms.Body = "<html><body><p>";
                mms.Body += "姓名:" + md.name + "<br />";
                mms.Body += "電話:" + md.tel + "<br />";
                mms.Body += "地址:" + md.addr + "<br />";
                mms.Body += "興趣:" + md.interest + "<br />";
                mms.Body += "備註:" + md.memo;
                mms.Body += "</p></body></html>";
                mms.IsBodyHtml = true;
                mms.BodyEncoding = Encoding.UTF8;


                SmtpClient smtp = new SmtpClient(CommWebSetup.MailServer);
                smtp.Send(mms);

                r.result = true;
            }
            catch (Exception ex)
            {
                r.message = ex.Message;
                r.result = false;
            }

            return defJSON(r);
        }

        public void mk1()
        {
            string t = "~/_Upload/Activities/ActivitiesDetail";
            string s = Server.MapPath(t);
            string[] g = Directory.GetDirectories(s);
            foreach (var n in g)
            {
                string m = n + "\\Photo1\\file.json";
                if (!System.IO.File.Exists(m))
                {
                    string f1 = n + "\\Photo1\\icon";
                    string f2 = n + "\\Photo1\\origin";

                    Directory.CreateDirectory(f1);
                    Directory.CreateDirectory(f2);

                    string fp = n + "\\Photo1\\";
                    var fs = Directory.EnumerateFiles(fp)
                    .Where(x => x.ToLower().EndsWith("jpg") || x.EndsWith("jpeg") || x.EndsWith("png") || x.EndsWith("gif"));

                    foreach (var ff in fs) {

                        System.IO.File.Copy(ff, f1, true);
                        System.IO.File.Copy(ff, f2, true);
                    }

                    Console.Write(fs);
                }
            }
        }
    }

    public class JoinUsMail
    {
        public string name { get; set; }
        public string tel { get; set; }
        public string addr { get; set; }
        public string email { get; set; }
        public string interest { get; set; }
        public string memo { get; set; }

    }
}
