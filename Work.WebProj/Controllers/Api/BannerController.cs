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
    public class BannerController : ajaxApi<BannerRotator, q_BannerRotator>
    {
        public async Task<IHttpActionResult> Get(int id)
        {
            using (db0 = getDB0())
            {
                item = await db0.BannerRotator.FindAsync(id);
                r = new AjaxGetData<BannerRotator>() { data = item };
            }

            return Ok(r);
        }
        public IHttpActionResult Get([FromUri]q_BannerRotator q)
        {
            #region 連接BusinessLogicLibary資料庫並取得資料

            using (db0 = getDB0())
            {
                var items = (from x in db0.BannerRotator
                             orderby x.banner_rotator_id descending
                             select new m_BannerRotator()
                             {
                                 banner_rotator_id = x.banner_rotator_id,
                                 banner_name = x.banner_name,
                                 is_open = x.is_open,
                                 start_date = x.start_date,
                                 end_date = x.end_date,
                                 sort = x.sort,
                                 category=x.category
                             });
                //if (q.title != null) {
                //    items = items.Where(x => x.標題.Contains(q.title));
                //}

                if (q.category != null)
                {
                    items = items.Where(x => x.category == q.category);
                }

                int page = (q.page == null ? 1 : (int)q.page);
                int startRecord = PageCount.PageInfo(page, this.defPageSize, items.Count());

                var resultItems = items.Skip(startRecord).Take(this.defPageSize).ToList();

                return Ok(new GridInfo<m_BannerRotator>()
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
        public async Task<IHttpActionResult> Put([FromBody]BannerRotator md)
        {
            ResultInfo rAjaxResult = new ResultInfo();
            try
            {
                db0 = getDB0();

                item = await db0.BannerRotator.FindAsync(md.banner_rotator_id);

                item.banner_name = md.banner_name;
                item.is_open = md.is_open;
                item.sort = md.sort;
                item.start_date = md.start_date;
                item.end_date = md.end_date;
                item.video_iframe = md.video_iframe;

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
        public async Task<IHttpActionResult> Post([FromBody]BannerRotator md)
        {
            md.banner_rotator_id = GetNewId(ProcCore.Business.CodeTable.News);
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

                db0.BannerRotator.Add(md);
                await db0.SaveChangesAsync();

                rAjaxResult.result = true;
                rAjaxResult.id = md.banner_rotator_id;
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
                    item = new BannerRotator() { banner_rotator_id = id };
                    db0.BannerRotator.Attach(item);
                    db0.BannerRotator.Remove(item);
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
