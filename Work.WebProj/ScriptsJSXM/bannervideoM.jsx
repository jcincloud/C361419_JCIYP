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
		return (

				<tr>
					<td className="text-center"><GridCheckDel iKey={this.props.ikey} chd={this.props.itemData.check_del} delCheck={this.delCheck} /></td>
					<td className="text-center"><GridButtonModify iKey={this.props.ikey} modify={this.modify}/></td>
					<td>{this.props.itemData.banner_name}</td>
					<td>{moment(this.props.itemData.start_date).format('YYYY-MM-DD')}</td>
					<td>{moment(this.props.itemData.end_date).format('YYYY-MM-DD')}</td>
					<td>{this.props.itemData.is_open ? <span className="label label-primary">顯示</span>:<span className="label label-default">隱藏</span>}</td>
					<td>{this.props.itemData.sort}</td>
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
			fieldData:{},
			searchData:{title:null,category:2},
			edit_type:0,
			checkAll:false
		};  
	},
	getDefaultProps:function(){
		return{	
			fdName:'fieldData',
			gdName:'searchData'

		};
	},	
	componentDidMount:function(){
		//只在客戶端執行一次，當渲染完成後立即執行。當生命週期執行到這一步，元件已經俱有 DOM 所以我們可以透過 this.getDOMNode() 來取得 DOM 。
		//如果您想整和其他 Javascript framework ，使用 setTimeout, setInterval, 或者是發動 AJAX 請在這個方法中執行這些動作。
		this.queryGridData(1);
	},
	shouldComponentUpdate:function(nextProps,nextState){
		return true;
	},	
	handleSubmit: function(e) {
		e.preventDefault();
		if(this.state.edit_type==1){
			jqPost(gb_approot + 'api/Banner',this.state.fieldData)
			.done(function(data, textStatus, jqXHRdata) {
				if(data.result){
					tosMessage(null,'新增完成',1);
					this.updateType(data.id);
				}else{
					alert(data.message);
				}
			}.bind(this))
			.fail(function( jqXHR, textStatus, errorThrown ) {
				showAjaxError(errorThrown);
			});
		}		
		else if(this.state.edit_type==2){
			jqPut(gb_approot + 'api/Banner',this.state.fieldData)
			.done(function(data, textStatus, jqXHRdata) {
				if(data.result){
					tosMessage(null,'修改完成',1);
				}else{
					alert(data.message);
				}
			}.bind(this))
			.fail(function( jqXHR, textStatus, errorThrown ) {
				showAjaxError(errorThrown);
			});
		};
		return;
	},
	deleteSubmit:function(e){

		if(!confirm('確定是否刪除?')){
			return;
		}

		var ids = [];
		for(var i in this.state.gridData.rows){
			if(this.state.gridData.rows[i].check_del){
				ids.push('ids='+this.state.gridData.rows[i].banner_rotator_id);
			}
		}

		if(ids.length==0){
			tosMessage(null,'未選擇刪除項',2);
			return;
		}

		jqDelete(gb_approot+'api/Banner?' + ids.join('&'),{})			
		.done(function(data, textStatus, jqXHRdata) {
			if(data.result){
				tosMessage(null,'刪除完成',1);
				this.queryGridData(0);
			}else{
				alert(data.message);
			}
		}.bind(this))
		.fail(function( jqXHR, textStatus, errorThrown ) {
			showAjaxError(errorThrown);
		});
	},
	handleSearch:function(e){
		e.preventDefault();
		this.queryGridData(0);
		return;
	},
	delCheck:function(i,chd){

		var newState = this.state;
		this.state.gridData.rows[i].check_del = !chd;
		this.setState(newState);
	},
	checkAll:function(){

		var newState = this.state;
		newState.checkAll = !newState.checkAll;
		for (var prop in this.state.gridData.rows) {
			this.state.gridData.rows[prop].check_del=newState.checkAll;
		}
		this.setState(newState);
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

		$.extend(parms, this.state.searchData);

		return jqGet(gb_approot + 'api/Banner',parms);
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
	insertType:function(){
		this.setState({edit_type:1,fieldData:{category:2}});
	},
	updateType:function(id){
		jqGet(gb_approot + 'api/Banner',{id:id})
		.done(function(data, textStatus, jqXHRdata) {
			this.setState({edit_type:2,fieldData:data.data});
		}.bind(this))
		.fail(function( jqXHR, textStatus, errorThrown ) {
			showAjaxError(errorThrown);
		});
	},
	noneType:function(){
		this.gridData(0)
		.done(function(data, textStatus, jqXHRdata) {
			this.setState({edit_type:0,gridData:data});
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
				<form onSubmit={this.handleSearch}>
					<div className="table-responsive">
						{/*<div className="table-header">
							<h5 className="table-title">搜尋<strong>這裡是關鍵字</strong>的結果:</h5>
							<div className="table-filter">
								<div className="form-inline">
									<div className="form-group">
										<label for="">日期</label> { }
										<span className="has-feedback">
					                        <input type="text" className="form-control input-sm datetimepicker" />
					                        <i className="fa-calendar form-control-feedback"></i>
					                    </span> { }
					                    <label for="">~</label> { }
					                    <span className="has-feedback">
					                        <input type="text" className="form-control input-sm datetimepicker" />
					                        <i className="fa-calendar form-control-feedback"></i>
					                    </span>
									</div> { }
									<div className="form-group">
										<label>標題</label> { }
										<input type="text" className="form-control input-sm" 
										value={searchData.title}
										onChange={this.changeGDValue.bind(this,'title')}
										placeholder="請輸入關鍵字..." />
										<button className="btn-primary btn-sm" type="submit"><i className="fa-search"></i> 搜尋</button>
									</div> { }
								</div>
							</div>
						</div>*/}
						<table>
							<thead>
								<tr>
									<th className="col-xs-1 text-center">
										<label className="cbox">
											<input type="checkbox" checked={this.state.checkAll} onChange={this.checkAll} />
											<i className="fa-check"></i>
										</label>
									</th>
									<th className="col-xs-1 text-center">修改</th>
									<th className="col-xs-4">名稱</th>
									<th className="col-xs-2">起始日</th>
									<th className="col-xs-2">結束日</th>
									<th className="col-xs-1">狀態</th>
									<th className="col-xs-1">排序</th>																		
								</tr>
							</thead>
							<tbody>
								{
									this.state.gridData.rows.map(function(itemData,i) {
									return <GridRow 
									key={i}
									ikey={i}
									primKey={itemData.banner_rotator_id} 
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
					deleteSubmit={this.deleteSubmit}
					/>
				</form>
			</div>
			);
		}
		else if(this.state.edit_type==1 || this.state.edit_type==2)
		{
			var fieldData = this.state.fieldData;

			outHtml=(
				<div>
					<ul className="breadcrumb">
						<li><i className="fa-list-alt"></i> {this.props.MenuName}</li>
					</ul>
					<h4 className="title">{this.props.Caption} 基本資料維護</h4>
					<form className="form-horizontal" onSubmit={this.handleSubmit}>
						<div className="form-group">
							<label className="col-xs-1 control-label">標題</label>
							<div className="col-xs-6">
								<input type="text" 
								className="form-control"	
								value={fieldData.banner_name}
								onChange={this.changeFDValue.bind(this,'banner_name')}
								maxLength="64"
								required />
							</div>
							<small className="col-xs-5 help-inline">最多可輸入64個字元</small>
						</div>
						<div className="form-group">
							<label className="col-xs-1 control-label">Youtube iframe</label>
							<div className="col-xs-6">
								<textarea rows="4" type="text" 
								className="form-control"	
								value={fieldData.video_iframe}
								onChange={this.changeFDValue.bind(this,'video_iframe')}
								maxLength="500"
								required />
							</div>
							<small className="col-xs-5 help-inline">請輸入完整youtube嵌入原始碼</small>
						</div>
						<div className="form-group has-feedback">
							<label className="col-xs-1 control-label">日期</label>
							<div className="col-xs-3">
								<InputDate id="start_date" name="start_date" onChange={this.changeFDValue} value={this.state.fieldData.start_date} />
								<i className="fa-calendar form-control-feedback"></i>
							</div>
							<label className="pull-left control-label"> ~ </label>
							<div className="col-xs-3">
								<InputDate id="end_date" name="end_date" onChange={this.changeFDValue} value={this.state.fieldData.end_date} />
								<i className="fa-calendar form-control-feedback"></i>
							</div>
						</div>
						<div className="form-group">
							<label className="col-xs-1 control-label">狀態</label>
							<div className="col-xs-3">
								<div className="radio-inline">
	                                <label>
										<input type="radio" 
										name="is_open"
										value={true}
										checked={fieldData.is_open===true} 
										onChange={this.changeFDValue.bind(this,'is_open')}
											/>
	                                    <span>顯示</span>
									</label>
	                            </div>
								<div className="radio-inline">
	                                <label>
										<input type="radio" 
										name="is_open"
										value={false}
										checked={fieldData.is_open===false} 
										onChange={this.changeFDValue.bind(this,'is_open')}
											/>
		                                <span>隱藏</span>
									</label>
								</div>
							</div>
							<label className="col-xs-1 control-label">排序</label>
							<div className="col-xs-2">
									<input type="number" 
									className="form-control"	
									value={fieldData.sort}
									onChange={this.changeFDValue.bind(this,'sort')}
									required />
							</div>
							<small className="help-inline col-xs-3">數字愈大排在愈前面</small>
						</div>
						<div className="form-action">
							<div className="col-xs-4 col-xs-offset-1">
								<button type="submit" className="btn-primary"><i className="fa-check"></i> 儲存</button>
								<button className="col-xs-offset-1" type="button" onClick={this.noneType}><i className="fa-times"></i> 回前頁</button>
							</div>
						</div>
					</form>
				</div>);
		}else{
			outHtml=(<span>No Page</span>);
		}

		return outHtml;
	}
});