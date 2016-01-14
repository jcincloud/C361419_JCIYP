using System;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Core;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using ProcCore.HandleResult;

namespace ProcCore.Business.DB0
{
    public enum EditState
    {
        Insert = 0,
        Update = 1
    }
    public partial class C36A0_JCIYPEntities : DbContext
    {
        public C36A0_JCIYPEntities(string connectionstring)
            : base(connectionstring)
        {
        }

        public override Task<int> SaveChangesAsync()
        {
            return base.SaveChangesAsync();
        }
        public override int SaveChanges()
        {
            try
            {
                return base.SaveChanges();
            }
            catch (DbEntityValidationException ex)
            {
                Log.Write(ex.Message, ex.StackTrace);
                foreach (var err_Items in ex.EntityValidationErrors)
                {
                    foreach (var err_Item in err_Items.ValidationErrors)
                    {
                        Log.Write("欄位驗證錯誤", err_Item.PropertyName, err_Item.ErrorMessage);
                    }
                }

                throw ex;
            }
            catch (DbUpdateException ex)
            {
                Log.Write("DbUpdateException", ex.InnerException.Message);
                throw ex;
            }
            catch (EntityException ex)
            {
                Log.Write("EntityException", ex.Message);
                throw ex;
            }
            catch (UpdateException ex)
            {
                Log.Write("UpdateException", ex.Message);
                throw ex;
            }
            catch (Exception ex)
            {
                Log.Write("Exception", ex.Message);
                throw ex;
            }
        }

    }

    #region Model Expand
    public partial class 活動花絮主檔 : BaseEntityTable
    {
        public IList<活動花絮內容L> IContext { get; set; }
        public string imgsrc { get; set; }
    }
    public partial class 會員 : BaseEntityTable
    {
        public string imgsrc_peoson { get; set; }
        public string imgsrc_company { get; set; }
    }
    public partial class 會員產品 : BaseEntityTable
    {
        public string imgsrc { get; set; }
        public EditState edit_state { get; set; }
    }
    public partial class m_會員產品 : BaseEntityTable
    {
        public string[] imgsrc { get; set; }
        public EditState edit_state { get; set; }
    }
    public partial class BannerRotator : BaseEntityTable
    {
        public string[] imgsrc { get; set; }
    }
    public class 活動花絮內容L
    {
        public int 流水號 { get; set; }
        public string 標題 { get; set; }
        public DateTime 活動日期 { get; set; }
        public bool 顯示狀態Flag { get; set; }
        public float 排序 { get; set; }
        public string 相簿連結 { get; set; }
        public string[] imgsrc { get; set; }
    }

    public partial class 活動花絮內容 : BaseEntityTable
    {
        public string[] imgsrc { get; set; }
        public EditState edit_state { get; set; }
    }

    public partial class m_活動花絮內容 : BaseEntityTable
    {
        public string[] imgsrc { get; set; }
        public EditState edit_state { get; set; }
    }
    public partial class 最新消息
    {
        public FilesObject[] fileList { get; set; }
    }


    #endregion

    #region q_Model_Define
    public class q_AspNetRoles : QueryBase
    {
        public string Name { set; get; }

    }
    public class q_AspNetUsers : QueryBase
    {
        public string UserName { set; get; }

    }
    public class q_NewsData : QueryBase
    {
        public string title { get; set; }
    }
    public class q_Document : QueryBase
    {
        public string title { get; set; }
        public int? category { get; set; }
        public int? year { get; set; }
        public string account { get; set; }
    }
    public class q_活動花絮 : QueryBase
    {
        public string title { get; set; }
    }
    public class q_活動花絮內容 : QueryBase
    {
        public int main_id { get; set; }
    }
    public class q_會員 : QueryBase
    {
        public string name { get; set; }
        public int? category { get; set; }
        public bool? state { get; set; }
        public bool? hot { get; set; }
        public string category_name { get; set; }

    }
    public class q_OtherUnit : QueryBase
    {
        public string name { get; set; }
        public int? category { get; set; }
        public bool? state { get; set; }
        public int? hot { get; set; }

    }
    public class q_Product : QueryBase
    {
        public int main_id { get; set; }
    }

    public class q_BannerRotator : QueryBase
    {
        public int main_id { get; set; }
        public int? category { get; set; }
    }

    #endregion

    #region c_Model_Define
    public class c_AspNetRoles
    {
        public q_AspNetRoles q { get; set; }
        public AspNetRoles m { get; set; }
    }
    public partial class c_AspNetUsers
    {
        public q_AspNetUsers q { get; set; }
        public AspNetUsers m { get; set; }
    }

    public class c_NewsData
    {
        public 最新消息 m_NewsData { get; set; }
        public q_NewsData q_NewsData { get; set; }
    }
    public class c_Active
    {
        public 活動花絮主檔 m_Active { get; set; }
        public q_活動花絮 q_Active { get; set; }
    }
    #endregion
}
