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
		var is_open_field = <span></span>;
		if(this.props.itemData.顯示狀態Flag==1)
			is_open_field = <span>顯示</span>;
		else if(this.props.itemData.顯示狀態Flag==0)
			is_open_field = <span style={{color:'red'}}>隱藏</span>;

		return (
				<tr>
					<td>{this.props.itemData.姓名}</td>
					<td>{this.props.itemData.職稱}</td>
					<td>{this.props.itemData.公司電話}</td>
					<td>{this.props.itemData.傳真電話}</td>
					<td>{this.props.itemData.地址}</td>
					<td>{this.props.itemData.Email}</td>
					<td>{is_open_field}</td>				
				</tr>
			);
		}
});

//表單登錄
var GirdForm = React.createClass({
	mixins: [React.addons.LinkedStateMixin], 
	getInitialState: function() {  
		return {
			gridData:[],
			searchData:{
				hot:0,
				name:null,
				category:1,
				state:true
			},
			edit_type:0,
			download_src:null,
			other_unit_category:[]
		};  
	},
	getDefaultProps:function(){
		return{	
			fdName:'fieldData',
			gdName:'searchData'

		};
	},	
	componentDidMount:function(){
		jqGet(gb_approot + 'api/GetAction/GetOtherUnitCategory',{})		
		.done(function(data, textStatus, jqXHRdata) {
			this.setState({other_unit_category:data});
		}.bind(this))
		.fail(function(jqXHR, textStatus, errorThrown) {
			showAjaxError(errorThrown);
		});;
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
		var print_url = gb_approot + 'Sys_Base/ReportToPdf/OtherUnitLabel?' + url_parms;

		this.setState({download_src:print_url});
		return;
	},	
	gridData:function(page){

		var parms = {};
		$.extend(parms, this.state.searchData);

		return jqGet(gb_approot + 'api/GetAction/GetOtherUnit',parms);
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
							<h5 className="table-title">搜尋<strong>這裡是關鍵字</strong>的結果:</h5>
							<div className="table-filter">
								<div className="form-inline">
									<div className="form-group">
										<label for="">標籤分類</label>
										<select className="form-control input-sm"
											value={searchData.hot}
											onChange={this.changeGDValue.bind(this,'hot')}>
											<option value=""></option>
											<option value="0">有地址</option>
											<option value="1">無地址</option>
										</select>
									</div>
									<div className="form-group">
										<label for="">會員分類</label> 
										<select className="form-control input-sm" 
											value={searchData.category}
											onChange={this.changeGDValue.bind(this,'category')}>
											{
												this.state.other_unit_category.map(function(itemData,i) {
													return <option key={i} value={itemData.流水號}>{itemData.分類名稱}</option>
												})
											}
										</select>
									</div>
									<div className="form-group">
											<label for="">顯示狀態</label>
											<select className="form-control input-sm" 
											value={searchData.state}
											onChange={this.changeGDValue.bind(this,'state')}>
												<option value="1">顯示</option>
												<option value="0">隱藏</option>
											</select>
									</div> 
									<div className="form-group">
										<label>關鍵字</label>
										<input type="text" className="form-control input-sm" 
										value={searchData.name}
										onChange={this.changeGDValue.bind(this,'name')}
										placeholder="請輸入關鍵字..." />
										<button className="btn-primary btn-sm" type="button" onClick={this.handleSearch}><i className="fa-search"></i> 搜尋</button>
									</div>
									<button className="btn-success btn-sm" type="submit"><i className="fa-print"></i> 列印</button>
								</div>
							</div>
						</div>
						<table>
							<thead>
								<tr>
									<th>姓名</th>
									<th>職稱</th>
									<th>公司電話</th>
									<th>傳真電話</th>
									<th>地址</th>
									<th>EMAIL</th>
									<th>顯示</th>
								</tr>
							</thead>
							<tbody>
							{
								this.state.gridData.map(function(itemData,i) {
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
					<iframe src={this.state.download_src} style={ {visibility:'hidden',display:'none'} } />
				</form>
			</div>
			);
		}
		return outHtml;
	}
});