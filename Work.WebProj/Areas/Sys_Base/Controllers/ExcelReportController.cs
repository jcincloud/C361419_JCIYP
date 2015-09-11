using OfficeOpenXml;
using ProcCore.Business.DB0;
using ProcCore.Business.LogicConect;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DotWeb.Areas.Sys_Base.Controllers
{
    public class ExcelReportController : BaseController
    {
        // GET: ExcelReport
        public FileResult downloadExcel_LabelPrint(q_會員 q)
        {
            ExcelPackage excel = null;
            FileStream fs = null;
            var db0 = getDB0();
            try
            {

                string ExcelTemplateFile = Server.MapPath("~/_Code/RPTExcel/LabelPrint.xlsx");
                FileInfo finfo = new FileInfo(ExcelTemplateFile);
                excel = new ExcelPackage(finfo, true);
                ExcelWorksheet sheet = excel.Workbook.Worksheets["SheetPrint"];

                sheet.View.TabSelected = true;
                #region 取得會員名單

                var items = db0.會員.Select(x => new { x.姓名,x.會員分類編號,x.會員狀態,x.會內職稱,x.發文註記,x.區號,x.地址,x.SEX});

                if (q.name != null)
                {
                    items = items.Where(x => x.姓名.Contains(q.name));
                }

                if (q.category != null)
                {
                    items = items.Where(x => x.會員分類編號 == q.category);
                }

                if (q.state != null)
                {
                    items = items.Where(x => x.會員狀態 == q.state);
                }

                if (q.hot != null)
                {
                    List<int> member_category = new List<int> { 1, 2, 3 };
                    if ((bool)q.hot)
                    {
                        items = items.Where(x => member_category.Contains((int)x.會員分類編號));
                    }
                    else
                    {
                        items = items.Where(x => x.發文註記 == false);
                    }
                }
                if (q.category_name != null)
                {
                    items = items.Where(x => x.會內職稱.Contains(q.category_name));
                }

                IList<MemberPrint> m = new List<MemberPrint>();
                foreach (var item in items)
                {
                    m.Add(new MemberPrint()
                    {
                        zip = item.區號,
                        address = item.地址,
                        category = item.會內職稱,
                        gender = item.SEX,
                        name = item.姓名
                    });
                }
                #endregion

                #region 複製列高
                int page = Convert.ToInt16(Math.Ceiling((Double)m.Count() / 20));//一頁22筆資料
                if (page > 1)
                {
                    for (var i = 1; i < page; i++)
                    {//從第二頁開始複製列高
                        for (var j = 1; j <= 40; j++)
                        {//一頁40列
                            sheet.Row(j + (i * 40)).Height = sheet.Row(j).Height;
                        }
                    }
                }
                #endregion

                #region Excel Handle

                int detail_row = 2;
                #region 主檔
                for (int i = 0; i < page; i++)
                { //此迴圈跑的事頁數(起始值0方便乘倍數)

                    var getMember = m.Skip(i * 20).Take(20);//取20筆會員(一頁20筆)

                    int index = 1;
                    foreach (var member in getMember)
                    {
                        int column = index % 2 == 0 ? 6 : 0;//基數偶數的資料列不一樣

                        #region 複製格式
                        if (i > 0)//一頁以後才開始複製
                        {
                            sheet.Cells["B2"].Copy(sheet.Cells[detail_row, 2 + column]);//郵遞區號
                            sheet.Cells["B3"].Copy(sheet.Cells[detail_row + 1, 2 + column]);//地址
                            sheet.Cells["C4"].Copy(sheet.Cells[detail_row + 2, 3 + column]);//會內職稱
                            sheet.Cells["D4"].Copy(sheet.Cells[detail_row + 2, 4 + column]);//姓名
                            sheet.Cells["E4"].Copy(sheet.Cells[detail_row + 2, 5 + column]);//地址
                            sheet.Cells["F4"].Copy(sheet.Cells[detail_row + 2, 6 + column]);//收
                        }
                        #endregion
                        sheet.Cells[detail_row, 2 + column].Value = member.zip;//郵遞區號
                        sheet.Cells[detail_row + 1, 2 + column].Value = member.address;//地址
                        sheet.Cells[detail_row + 2, 3 + column].Value = member.category;//會內職稱
                        sheet.Cells[detail_row + 2, 4 + column].Value = member.name;//姓名
                        sheet.Cells[detail_row + 2, 5 + column].Value = member.gender;//性別
                        sheet.Cells[detail_row + 2, 6 + column].Value = "收";//收

                        if (index % 2 == 0)
                            detail_row += 4;

                        index++;
                    }
                }



                #endregion

                //sheet.Cells.Calculate(); //要對所以Cell做公計計算 否則樣版中的公式值是不會變的

                #endregion

                string filename = "LabelPrint" + DateTime.Now.ToString("yyyyMMddHHmm") + ".xlsx";
                string filepath = Server.MapPath("~/_Code/Log/" + filename);
                fs = new FileStream(filepath, FileMode.Create, FileAccess.ReadWrite);
                excel.SaveAs(fs);
                fs.Position = 0;
                return File(fs, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", filename);
            }
            catch (Exception ex)
            {

                Console.Write(ex.Message);
                return null;
            }
            finally
            {
                db0.Dispose();
            }
        }
    }
}