var GridRow = React.createClass({
	mixins: [React.addons.LinkedStateMixin], 
	getInitialState: function() {  
		return { 
		};  
	},
	delCheck:function(i,chd){
		this.props.delCheck(i,chd);
	},
	modify:function(){
		this.props.updateType(this.props.primKey);
	},
	render:function(){
		var hot_field = <span>NO</span>;
		if(this.props.itemData.發文註記==1)
			hot_field = <span>電子郵件</span>;
		else if(this.props.itemData.發文註記==0)
			hot_field = <span className="label label-warning">紙本</span>;

		return (
				<tr>
					<td>{this.props.itemData.會員編號}</td>
					<td>{this.props.itemData.會內職稱}</td>
					<td>{this.props.itemData.姓名}</td>
					<td>{this.props.itemData.地址}</td>
					<td>{this.props.itemData.行動電話}</td>
					<td>{moment(this.props.itemData.入會日期).format('YYYY-MM-DD')}</td>
					<td>{hot_field}</td>
					<td>{this.props.itemData.會員狀態==1 ? <span className="label label-success">正常</span>:<span className="label label-default">休會</span>}</td>						
					<td>{this.props.itemData.顯示狀態Flag ? <span className="label label-primary">顯示</span>:<span className="label label-default">隱藏</span>}</td>				
				</tr>
			);
		}
});

//表單登錄
var GirdForm = React.createClass({
	mixins: [React.addons.LinkedStateMixin], 
	getInitialState: function() {  
		return {
			gridData:{rows:[],page:1},
			searchData:{
				hot:false,
				name:null,
				category:null,
				state:null,
				category_name:null
			},
			edit_type:0,
			download_src:null
		};  
	},
	getDefaultProps:function(){
		return{	
			fdName:'fieldData',
			gdName:'searchData'

		};
	},	
	componentWillMount:function(){
		//在輸出前觸發，只執行一次如果您在這個方法中呼叫 setState() ，會發現雖然 render() 再次被觸發了但它還是只執行一次。

	},
	componentDidMount:function(){
		//只在客戶端執行一次，當渲染完成後立即執行。當生命週期執行到這一步，元件已經俱有 DOM 所以我們可以透過 this.getDOMNode() 來取得 DOM 。
		//如果您想整和其他 Javascript framework ，使用 setTimeout, setInterval, 或者是發動 AJAX 請在這個方法中執行這些動作。
		this.queryGridData(1);
	},
	componentDidUpdate:function(prevProps, prevState){
		/*
			在元件更新之後執行。這個方法同樣不在初始化時執行，使用時機為當元件被更新之後需要執行一些操作。
		*/
	},
	handleSearch:function(e){
		e.preventDefault();
		this.queryGridData(0);
		return;
	},
	handlePrint:function(e){
		e.preventDefault();

		var parms = {tid:uniqid()};
		$.extend(parms, this.state.searchData);

		var url_parms = $.param(parms);
		var print_url = gb_approot + 'Sys_Base/ReportToPdf/MemberLabel?' + url_parms;

		this.setState({download_src:print_url});
		return;
	},
	excelPrint:function(e){
		e.preventDefault();

		var parms = {tid:uniqid()};
		$.extend(parms, this.state.searchData);

		var url_parms = $.param(parms);
		var print_url = gb_approot + 'Sys_Base/ExcelReport/downloadExcel_LabelPrint?' + url_parms;

		this.setState({download_src:print_url});
		return;
	},
	gridData:function(page){

		var parms = {
			page:0
		};

		if(page==0){
			parms.page=this.state.gridData.page;
		}else{
			parms.page=page;
		}
		if(this.state.searchData.hot){
			this.state.searchData.state=true;
		}
		$.extend(parms, this.state.searchData);

		return jqGet(gb_approot + 'api/Member',parms);
	},
	queryGridData:function(page){
		this.gridData(page)
		.done(function(data, textStatus, jqXHRdata) {
			this.setState({gridData:data});
		}.bind(this))
		.fail(function(jqXHR, textStatus, errorThrown) {
			showAjaxError(errorThrown);
		});
	},
	changeFDValue:function(name,e){
		this.setInputValue(this.props.fdName,name,e);
	},
	changeGDValue:function(name,e){
		this.setInputValue(this.props.gdName,name,e);
	},
	setInputValue:function(collentName,name,e){

		var obj = this.state[collentName];
		if(e.target.value=='true'){
			obj[name] = true;
		}else if(e.target.value=='false'){
			obj[name] = false;
		}else{
			obj[name] = e.target.value;
		}
		this.setState({fieldData:obj});
	},
	render: function() {
		var outHtml = null;

		if(this.state.edit_type==0)
		{
			var searchData = this.state.searchData;
			var searchHtml=null;
			if(searchData.hot==false){
				searchHtml=(
						<span>
							<div className="form-group">
								<label for="">會員分類</label>
								<select className="form-control input-sm" 
									value={searchData.category}
									onChange={this.changeGDValue.bind(this,'category')}>
										<option value="">全部</option>
										<option value="1">見習會友</option>
										<option value="2">一般會友(YB)</option>
										<option value="3">超齡會友(OB)</option>
										<option value="4">見習未通過</option>
										<option value="5">見習已通過 尚未入會</option>											
										<option value="6">顧問</option>
										<option value="7">已故會友</option>
								</select>
							</div>
							<div className="form-group">
								<label for="">會員狀態</label> 
								<select className="form-control input-sm" 
									value={searchData.state}
									onChange={this.changeGDValue.bind(this,'state')}>
										<option value="">全部</option>
										<option value="true">正常</option>
										<option value="false">休會</option>
								</select>
							</div>
						</span>							
					);
			}else{
				searchHtml=(
							<div className="form-group">
								<label for="">會員分類</label>
								<select className="form-control input-sm" 
									value={searchData.category}
									onChange={this.changeGDValue.bind(this,'category')}>
										<option value="">全部</option>
										<option value="1">見習會友</option>
										<option value="2">一般會友(YB)</option>
										<option value="3">超齡會友(OB)</option>
								</select>
							</div>
					);
			}

			outHtml =
			(
			<div>
				<ul className="breadcrumb">
					<li><i className="fa-list-alt"></i> {this.props.MenuName}</li>
				</ul>
				<h3 className="title">
					{this.props.Caption}
				</h3>
				<form onSubmit={this.handlePrint}>
					<div className="table-responsive">
						<div className="table-header">
							{/*<h5 className="table-title">搜尋<strong>這裡是關鍵字</strong>的結果:</h5>*/}
							<div className="table-filter">
								<div className="form-inline">
									<div className="form-group">
										<label for="">標籤分類</label> { }
										<select className="form-control input-sm"
											value={searchData.hot}
											onChange={this.changeGDValue.bind(this,'hot')}>
											<option value="">全部</option>
											<option value="false">會內發文</option>
											<option value="true">會友購買</option>
										</select>
									</div> { }
									{searchHtml}
									<div className="form-group">
										<label>姓名</label> { }
										<input type="text" className="form-control input-sm" 
										value={searchData.name}
										onChange={this.changeGDValue.bind(this,'name')}
										placeholder="請輸入關鍵字..." />						
									</div> { }
									<div className="form-group">
										<label>會內職稱</label> { }
										<input type="text" className="form-control input-sm" 
										value={searchData.category_name}
										onChange={this.changeGDValue.bind(this,'category_name')}
										placeholder="請輸入關鍵字..." />
										<button className="btn-primary btn-sm" type="button" onClick={this.handleSearch}><i className="fa-search"></i> 搜尋</button>
									</div> { }
									{/*<button className="btn-success btn-sm" type="submit"><i className="fa-print"></i> 列印</button>*/}
									<button className="btn-success btn-sm" type="button" onClick={this.excelPrint}><i className="fa-print"></i> 列印</button>
								</div>
							</div>
						</div>
						<table>
							<thead>
								<tr>
									<th>會員編號</th>
									<th>會內職稱</th>
									<th>姓名</th>
									<th>地址</th>
									<th>行動電話</th>
									<th>入會日期</th>
									<th>發文</th>
									<th>休會</th>
									<th>顯示?</th>
								</tr>
							</thead>
							<tbody>
							{
								this.state.gridData.rows.map(function(itemData,i) {
								return <GridRow 
								key={i}
								ikey={i}
								primKey={itemData.流水號} 
								itemData={itemData} 
								delCheck={this.delCheck}
								updateType={this.updateType}								
								/>;
								}.bind(this))
							}
							</tbody>
						</table>
					</div>
					<GridNavPage 
					StartCount={this.state.gridData.startcount}
					EndCount={this.state.gridData.endcount}
					RecordCount={this.state.gridData.records}
					TotalPage={this.state.gridData.total}
					NowPage={this.state.gridData.page}
					onQueryGridData={this.queryGridData}
					InsertType={this.insertType}
					UpdateType={this.insertType}
					showAdd={false}
					showDelete={false}
					deleteSubmit={this.deleteSubmit}
					/>
					<iframe src={this.state.download_src} style={ {visibility:'hidden',display:'none'} } />
				</form>
			</div>
			);
		}
		return outHtml;
	}
});