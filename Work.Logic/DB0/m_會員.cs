//------------------------------------------------------------------------------
// <auto-generated>
//     這個程式碼是由範本產生。
//
//     對這個檔案進行手動變更可能導致您的應用程式產生未預期的行為。
//     如果重新產生程式碼，將會覆寫對這個檔案的手動變更。
// </auto-generated>
//------------------------------------------------------------------------------

namespace ProcCore.Business.DB0
{
    using System;
    using System.Collections.Generic;
    public partial class m_會員 :BaseEntityTable {
    public int 流水號 { get; set; }
    public string 會員編號 { get; set; }
    public Nullable<int> 會員分類編號 { get; set; }
    public string 姓名 { get; set; }
    public string 會內職稱 { get; set; }
    public string SEX { get; set; }
    public Nullable<double> 職業別 { get; set; }
    public string 主行業 { get; set; }
    public string 副行業 { get; set; }
    public string 公司電話 { get; set; }
    public string 住家電話 { get; set; }
    public string 行動電話 { get; set; }
    public string 傳真 { get; set; }
    public string Email { get; set; }
    public string 網站 { get; set; }
    public string 區號 { get; set; }
    public string 地址 { get; set; }
    public string 生日 { get; set; }
    public System.DateTime 入會日期 { get; set; }
    public string 宣示日期 { get; set; }
    public string 社團經歷 { get; set; }
    public string 公司簡介 { get; set; }
    public string 服務項目 { get; set; }
    public string 帳號 { get; set; }
    public string 密碼 { get; set; }
    public Nullable<float> 排序 { get; set; }
    public bool 顯示狀態Flag { get; set; }
    public bool 會員狀態 { get; set; }
    public bool 發文註記 { get; set; }
    public Nullable<System.DateTime> 活動日期 { get; set; }
    public Nullable<System.DateTime> 修改日期 { get; set; }
    public Nullable<int> 點閱率 { get; set; }
    public string 新增人員 { get; set; }
    public string 修改人員 { get; set; }
    }
}
