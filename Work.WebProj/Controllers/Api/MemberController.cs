using DotWeb.Helpers;
using ProcCore.Business.DB0;
using ProcCore.HandleResult;
using ProcCore.WebCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace DotWeb.Api
{
    public class MemberController : ajaxApi<會員, q_會員>
    {
        public async Task<IHttpActionResult> Get(int id)
        {
            using (db0 = getDB0())
            {
                item = await db0.會員.FindAsync(id);
                r = new AjaxGetData<會員>() { data = item };
            }

            return Ok(r);
        }
        public IHttpActionResult Get([FromUri]q_會員 q)
        {
            #region 連接BusinessLogicLibary資料庫並取得資料

            using (db0 = getDB0())
            {
                var items = (from x in db0.會員
                             orderby x.會員編號 descending
                             select new m_會員()
                             {
                                 流水號 = x.流水號,
                                 姓名 = x.姓名,
                                 入會日期 = x.入會日期,
                                 行動電話 = x.行動電話,
                                 顯示狀態Flag = x.顯示狀態Flag,
                                 會員分類編號 = x.會員分類編號,
                                 會員狀態 = x.會員狀態,
                                 排序 = x.排序,
                                 會員編號 = x.會員編號,
                                 發文註記 = x.發文註記,
                                 地址 = x.地址,
                                 主行業 = x.主行業,
                                 會內職稱 = x.會內職稱
                             });
                if (!string.IsNullOrEmpty(this.UserId))
                {
                    int get_id = int.Parse(this.UserId);
                    items = items.Where(x => x.流水號 == get_id);
                }

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



                int page = (q.page == null ? 1 : (int)q.page);
                int startRecord = PageCount.PageInfo(page, this.defPageSize, items.Count());

                var resultItems = items.Skip(startRecord).Take(this.defPageSize).ToList();

                return Ok(new GridInfo<m_會員>()
                {
                    rows = resultItems,
                    total = PageCount.TotalPage,
                    page = PageCount.Page,
                    records = PageCount.RecordCount,
                    startcount = PageCount.StartCount,
                    endcount = PageCount.EndCount
                });
            }
            #endregion
        }
        public async Task<IHttpActionResult> Put([FromBody]會員 md)
        {
            ResultInfo rAjaxResult = new ResultInfo();
            try
            {
                db0 = getDB0();

                item = await db0.會員.FindAsync(md.流水號);
                //個人基本資料
                //第一列
                item.姓名 = md.姓名;
                item.SEX = md.SEX;
                item.主行業 = md.主行業;
                item.副行業 = md.副行業;
                //第二列
                item.公司電話 = md.公司電話;
                item.行動電話 = md.行動電話;
                item.住家電話 = md.住家電話;
                //第三列
                item.Email = md.Email;
                item.生日 = md.生日;
                item.傳真 = md.傳真;
                //第四列
                item.網站 = md.網站;
                //第五列
                item.區號 = md.區號;
                item.地址 = md.地址;
                //第七列
                item.公司簡介 = md.公司簡介;
                item.服務項目 = md.服務項目;

                //會員資料
                //第一列
                item.會員分類編號 = md.會員分類編號;
                item.會內職稱 = md.會內職稱;
                item.入會日期 = md.入會日期;
                //第二列
                item.會員編號 = md.會員編號;
                item.帳號 = md.會員編號;//登入帳號=會員編號
                item.密碼 = md.密碼;
                item.宣示日期 = md.宣示日期;
                //第三列
                item.排序 = md.排序;
                item.會員狀態 = md.會員狀態;
                item.顯示狀態Flag = md.顯示狀態Flag;
                item.發文註記 = md.發文註記;
                //第四列
                item.社團經歷 = md.社團經歷;

                item.活動日期 = md.活動日期;

                var details = item.會員產品;

                foreach (var detail in details)
                {
                    var md_detail = md.會員產品.First(x => x.流水號 == detail.流水號);

                    detail.產品名稱 = md_detail.產品名稱;
                    detail.產品特色 = md_detail.產品特色;
                    detail.產品編號 = md_detail.產品編號;
                    detail.價格 = md_detail.價格;
                    detail.價格說明 = md_detail.價格說明;
                    detail.排序 = md_detail.排序;
                    detail.曝光 = md_detail.曝光;
                    detail.顯示狀態Flag = md_detail.顯示狀態Flag;
                    detail.修改日期 = DateTime.Now;

                }

                var add_detail = md.會員產品.Where(x => x.edit_state == EditState.Insert);
                foreach (var detail in add_detail)
                {
                    detail.流水號 = GetNewId();
                    details.Add(detail);
                }

                await db0.SaveChangesAsync();
                rAjaxResult.result = true;
            }
            catch (Exception ex)
            {
                rAjaxResult.result = false;
                rAjaxResult.message = ex.ToString();
            }
            finally
            {
                db0.Dispose();
            }
            return Ok(rAjaxResult);
        }
        public async Task<IHttpActionResult> Post([FromBody]會員 md)
        {
            md.流水號 = GetNewId(ProcCore.Business.CodeTable.News);
            ResultInfo rAjaxResult = new ResultInfo();
            if (!ModelState.IsValid)
            {
                rAjaxResult.message = ModelStateErrorPack();
                rAjaxResult.result = false;
                return Ok(rAjaxResult);
            }

            try
            {
                #region working a
                db0 = getDB0();
                //if (md.生日 != null) {
                //    DateTime birthday = DateTime.Parse(md.生日);
                //    md.密碼 = (birthday.Year - 1911).ToString()+birthday.ToString("MMdd");
                //}

                db0.會員.Add(md);
                await db0.SaveChangesAsync();

                rAjaxResult.result = true;
                rAjaxResult.id = md.流水號;
                return Ok(rAjaxResult);
                #endregion
            }
            catch (Exception ex)
            {
                rAjaxResult.result = false;
                rAjaxResult.message = ex.Message;
                return Ok(rAjaxResult);
            }
            finally
            {
                db0.Dispose();
            }
        }
        public async Task<IHttpActionResult> Delete([FromUri]int[] ids)
        {
            ResultInfo rAjaxResult = new ResultInfo();
            try
            {
                db0 = getDB0();

                foreach (var id in ids)
                {

                    var exits_product = db0.會員產品.Any(x => x.會員流水號 == id);
                    if (exits_product)
                    {
                        rAjaxResult.result = false;
                        rAjaxResult.message = "會員有產品資料無法刪除";
                    }


                    item = new 會員() { 流水號 = id };
                    db0.會員.Attach(item);
                    db0.會員.Remove(item);
                }

                await db0.SaveChangesAsync();

                rAjaxResult.result = true;
                return Ok(rAjaxResult);
            }
            catch (Exception ex)
            {
                rAjaxResult.result = false;
                rAjaxResult.message = ex.Message;
                return Ok(rAjaxResult);
            }
            finally
            {
                db0.Dispose();
            }
        }
    }
}
