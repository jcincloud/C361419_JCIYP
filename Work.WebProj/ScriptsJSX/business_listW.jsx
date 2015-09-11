var ImgList = React.createClass({
	getInitialState: function() {  
		return { 
		};  
	},
	render:function(){	
		
		if(this.props.imgsrc!=undefined){
			return <img src={this.props.imgsrc} />;
		}else{
			return <img src={gb_approot + 'Content/images/Activities/no_pic.jpg'} />;
		}
	}
});


//[1]
//主元件 Tabs集合區段
var PageContent = React.createClass({
	mixins: [React.addons.LinkedStateMixin], 
	getInitialState: function() {  
		return { 
			gridData:{rows:[]},
			page:1,
			y:null
		};  
	},		
	componentDidMount:function(){
		this.queryData(this.state.page);
		return;
	},
	yearChange:function(event){
		this.queryDataY(event.target.value);
	},
	queryData:function(page){
		jqGet(this.props.dataUrl,{page:page,y:this.state.y})
		.done(function(data, textStatus, jqXHRdata) {
			this.setState({gridData:data,page:page});
		}.bind(this))
		.fail(function( jqXHR, textStatus, errorThrown ) {
			showAjaxError(errorThrown);
		});
	},
	queryDataY:function(y){
		jqGet(this.props.dataUrl,{page:1,y:y})
		.done(function(data, textStatus, jqXHRdata) {
			this.setState({gridData:data,page:1,y:y});
		}.bind(this))
		.fail(function( jqXHR, textStatus, errorThrown ) {
			showAjaxError(errorThrown);
		});
	},
	pageSelect:function(e){
		this.queryData(e.target.value);
		return false;
	},
	pageClick:function(page){
		this.queryData(page);
		return false;
	},
	pageFirst:function(){
		this.queryData(1);
		return false;
	},
	pageLast:function(){
		this.queryData(this.state.gridData.total);
		return false;
	},		
	pagePrve:function(){
		if(this.state.page > 1){
			this.queryData(this.state.page - 1);
		}else{
			this.queryData(1);
		}
		return false;
	},
	pageNext:function(){
		if(this.state.page + 1 < this.state.gridData.total){
			this.queryData(this.state.page + 1);
		}else{
			this.queryData(this.state.gridData.total);
		}
		return false;
	},
	addCTR:function(id,e){
		jqGet(gb_approot + 'api/GetAction/GetTest',{id:id})
		.done(function(data, textStatus, jqXHRdata) {
			console.log(data);
		}.bind(this))
		.fail(function( jqXHR, textStatus, errorThrown ) {
			showAjaxError(errorThrown);
		});
	},
	render:function(){

		var dpage = [];
		for(var i=1;i<=this.state.gridData.total;i++){
			dpage.push(<option value={i} >第{i}頁</option>);
		}
		var outHtml = (
		<div>
			<div className="table-responsive">
				<table className="pro-list">
					<tr>
						<th>產品</th>
						<th>介紹</th>
					</tr>
					{
						this.state.gridData.rows.map(function(itemData,i) {

							var price = itemData.價格 == undefined ? '無':itemData.價格;
							var subOutHtml =
							<tr key={i} >
								<td onClick={this.addCTR.bind(this,itemData.流水號)}><a href={gb_approot + 'Member/Member_content?id=' + itemData.mid} >
										<ImgList imgsrc={itemData.imgsrc} />
									</a>
								</td>
								<td>
									<p onClick={this.addCTR.bind(this,itemData.流水號)}>產品名稱：<a href={gb_approot + 'Member/Member_content?id=' + itemData.mid}  >{itemData.產品名稱}</a></p>
									<p>參考價格：<em>{price}</em></p>
									<p dangerouslySetInnerHTML={{__html:'產品特色：' + itemData.產品特色}}></p>
									<p>供應商：<a href={gb_approot + 'Member/Member_content?id=' + itemData.mid}>{itemData.姓名}</a></p>
									<p>點閱率：{itemData.點閱率}</p>
								</td>
							</tr>;

							return subOutHtml;
						}.bind(this))
					}
				</table>
			</div>

			<PageWWW 
				pageFirst={this.pageFirst}
				pagePrve={this.pagePrve}
				page={this.state.page}
				pageSelect={this.pageSelect}
				pageNext={this.pageNext}
				pageLast={this.pageLast}
				total={this.state.gridData.total}
				dpage={dpage}
			/>
		</div>
			);
		return outHtml;
	}
});

//元件嵌入 div id:PageContent
var comp = React.render(<PageContent dataUrl={gb_approot + 'api/GetAction/GetBusinessWWW'} 
	contextUrl={gb_approot + 'News/News_content?id='} />,document.getElementById('PageContent'));