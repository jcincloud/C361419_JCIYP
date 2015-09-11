using DotWeb.Helpers;
using ProcCore.Business.DB0;
using ProcCore.HandleResult;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace DotWeb.Api
{
    public class ActiveContentController : ajaxApi<活動花絮內容, q_活動花絮內容>
    {
        public async Task<IHttpActionResult> Get(int id)
        {
            using (db0 = getDB0())
            {
                item = await db0.活動花絮內容.FindAsync(id);
                r = new AjaxGetData<活動花絮內容>() { data = item };
            }

            return Ok(r);
        }
        public IHttpActionResult Get([FromUri]q_活動花絮內容 q)
        {
            #region 連接BusinessLogicLibary資料庫並取得資料

            using (db0 = getDB0())
            {
                var items = (from x in db0.活動花絮內容
                             orderby x.排序 descending
                             where x.主檔流水號 == q.main_id
                             select new m_活動花絮內容()
                             {
                                 流水號 = x.流水號,
                                 主檔流水號 = x.主檔流水號,
                                 標題 = x.標題,
                                 活動日期 = x.活動日期,
                                 顯示狀態Flag = x.顯示狀態Flag,
                                 排序 = x.排序,
                                 相簿連結=x.相簿連結,
                                 edit_state = EditState.Update
                             });

                return Ok(items.ToList());
            }
            #endregion
        }
        public async Task<IHttpActionResult> Put([FromBody]活動花絮內容 md)
        {
            ResultInfo rAjaxResult = new ResultInfo();
            try
            {
                db0 = getDB0();

                item = await db0.活動花絮內容.FindAsync(md.流水號);

                item.標題 = md.標題;
                item.活動日期 = md.活動日期;
                item.顯示狀態Flag = md.顯示狀態Flag;
                item.排序 = md.排序;
                item.相簿連結 = md.相簿連結;

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
        public async Task<IHttpActionResult> Post([FromBody]活動花絮內容 md)
        {
            md.流水號 = GetNewId(ProcCore.Business.CodeTable.Base);

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

                db0.活動花絮內容.Add(md);
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
                    item = new 活動花絮內容() { 流水號 = id };
                    db0.活動花絮內容.Attach(item);
                    db0.活動花絮內容.Remove(item);
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
