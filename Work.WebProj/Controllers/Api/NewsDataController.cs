using DotWeb.Helpers;
using ProcCore.Business.DB0;
using ProcCore.HandleResult;
using ProcCore.WebCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace DotWeb.Api
{
    public class NewsDataController : ajaxApi<最新消息, q_NewsData>
    {
        public async Task<IHttpActionResult> Get(int id)
        {
            using (db0 = getDB0())
            {
                item = await db0.最新消息.FindAsync(id);
                r = new AjaxGetData<最新消息>() { data = item };
            }

            return Ok(r);
        }
        public IHttpActionResult Get([FromUri]q_NewsData q)
        {
            #region 連接BusinessLogicLibary資料庫並取得資料

            using (db0 = getDB0())
            {
                var items = (from x in db0.最新消息
                             orderby x.流水號 descending
                             select new m_最新消息()
                             {
                                 流水號 = x.流水號,
                                 標題 = x.標題,
                                 活動日期 = x.活動日期,
                                 顯示狀態Flag = x.顯示狀態Flag,
                                 分類 = x.分類,
                                 排序=x.排序
                             });

                if (q.title != null) {
                    items = items.Where(x => x.標題.Contains(q.title));
                }

                int page = (q.page == null ? 1 : (int)q.page);
                int startRecord = PageCount.PageInfo(page, this.defPageSize, items.Count());

                var resultItems = items.Skip(startRecord).Take(this.defPageSize).ToList();

                return Ok(new GridInfo<m_最新消息>()
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
        public async Task<IHttpActionResult> Put([FromBody]最新消息 md)
        {
            ResultInfo rAjaxResult = new ResultInfo();
            try
            {
                db0 = getDB0();

                item = await db0.最新消息.FindAsync(md.流水號);

                item.標題 = md.標題;
                item.活動日期 = md.活動日期;
                item.顯示狀態Flag = md.顯示狀態Flag;
                item.分類 = md.分類;
                item.內容 = md.內容;
                item.排序 = md.排序;

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
        public async Task<IHttpActionResult> Post([FromBody]最新消息 md)
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
                //Cookie_UserName
                md.分類 = 1;//最新消息目前分類無使用先預設代1


                db0.最新消息.Add(md);
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
                    item = new 最新消息() { 流水號 = id };
                    db0.最新消息.Attach(item);
                    db0.最新消息.Remove(item);
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
