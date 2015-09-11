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
    public class ProductController : ajaxApi<會員產品, q_Product>
    {
        public async Task<IHttpActionResult> Get(int id)
        {
            using (db0 = getDB0())
            {
                item = await db0.會員產品.FindAsync(id);
                r = new AjaxGetData<會員產品>() { data = item };
            }

            return Ok(r);
        }
        public IHttpActionResult Get([FromUri]q_Product q)
        {
            #region 連接BusinessLogicLibary資料庫並取得資料

            using (db0 = getDB0())
            {
                var items = (from x in db0.會員產品
                             orderby x.排序 descending
                             where x.會員流水號 == q.main_id
                             select new m_會員產品()
                             {
                                 流水號 = x.流水號,
                                 會員流水號 = x.會員流水號,
                                 價格 = x.價格,
                                 價格說明 = x.價格說明,
                                 產品特色 = x.產品特色,
                                 產品名稱 = x.產品名稱,
                                 活動日期 = x.活動日期,
                                 顯示狀態Flag = x.顯示狀態Flag,
                                 排序 = x.排序,
                                 edit_state = EditState.Update
                             });
                return Ok(items.ToList());
            }
            #endregion
        }
        public async Task<IHttpActionResult> Put([FromBody]會員產品 md)
        {
            ResultInfo rAjaxResult = new ResultInfo();
            try
            {
                db0 = getDB0();

                item = await db0.會員產品.FindAsync(md.流水號);

                item.產品名稱 = md.產品名稱;
                item.產品特色 = md.產品特色;
                item.產品編號 = md.產品編號;
                item.價格 = md.價格;
                item.價格說明 = md.價格說明;
                item.排序 = md.排序;
                item.曝光 = md.曝光;
                item.顯示狀態Flag = md.顯示狀態Flag;
                item.修改日期 = DateTime.Now;

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
        public async Task<IHttpActionResult> Post([FromBody]會員產品 md)
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

                db0.會員產品.Add(md);
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
                    item = new 會員產品() { 流水號 = id };
                    db0.會員產品.Attach(item);
                    db0.會員產品.Remove(item);
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
