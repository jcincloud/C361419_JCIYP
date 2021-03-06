var Figcaption = React.createClass({
	getInitialState: function() {  
		return { 
		};  
	},
	render:function(){	
		var img = null;
		if(this.props.itemData.imgsrc==undefined){
			img = <img data-src={gb_approot + 'Content/images/Activities/no_pic.jpg'} className="lazyLoading"/>
		}else{
			img = <img data-src={this.props.itemData.imgsrc} className="lazyLoading" />
		}
		//console.log(this.props.itemData.imgsrc);
		var outHtml = (
		<figure className="effect">
			{img}
			<figcaption>
				<h4>{this.props.itemData.標題}</h4>
				<em>{moment(this.props.itemData.活動日期).format('YYYY-MM-DD')}</em>
				<p>
				{
					this.props.itemData.活動花絮內容.map(function(itemData,i) {
						var subOutHtml = <a key={i} href={gb_approot + 'Activities/Activities_content?ID=' + this.props.itemData.流水號 + '&tag=' + itemData.流水號 +'&t='+uniqid()+ '#' + itemData.流水號}><span>{itemData.標題}</span></a>;
						return subOutHtml;
					}.bind(this))
				}
				</p>
			</figcaption>
		</figure>
		);

		return outHtml;
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
			y:null,
			searchKey:null
		};  
	},
	componentDidMount:function(){
		//只在客戶端執行一次，當渲染完成後立即執行。當生命週期執行到這一步，元件已經俱有 DOM 所以我們可以透過 this.getDOMNode() 來取得 DOM 。
		//如果您想整和其他 Javascript framework ，使用 setTimeout, setInterval, 或者是發動 AJAX 請在這個方法中執行這些動作。
	},	
	componentDidMount:function(prevProps, prevState){
		this.queryData(this.state.page);
	},
	yearChange:function(event){
		this.queryDataY(event.target.value);
	},
	queryData:function(page){
		jqGet(this.props.dataUrl,{searchKey:this.state.searchKey,y:this.state.y})
		.done(function(data, textStatus, jqXHRdata) {
			this.setState({gridData:data,page:page});
			$('.lazyLoading').lazyLoadXT({ visibleOnly: false, edgeY: 200 });
		}.bind(this))
		.fail(function( jqXHR, textStatus, errorThrown ) {
			showAjaxError(errorThrown);
		});
	},
	queryDataY:function(y){
		jqGet(this.props.dataUrl,{searchKey:null,y:y})
		.done(function(data, textStatus, jqXHRdata) {
			this.setState({gridData:data,y:y});
			$('.lazyLoading').lazyLoadXT({ visibleOnly: false, edgeY: 200 });
		}.bind(this))
		.fail(function( jqXHR, textStatus, errorThrown ) {
			showAjaxError(errorThrown);
		});
	},
	pageClick:function(page){
		this.queryData(page);
		return false;
	},
	pagePrve:function(){
		if(this.state.page > 1){
			this.queryData(this.state.page - 1);
		}
		return false;
	},
	pageNext:function(){
		if(this.state.page < this.state.gridData.total){
			this.queryData(this.state.page + 1);
		}
		return false;
	},
	search:function(){
		jqGet(this.props.dataUrl,{searchKey:this.state.searchKey,y:this.state.y})
		.done(function(data, textStatus, jqXHRdata) {
			this.setState({gridData:data});
						$('.lazyLoading').lazyLoadXT({ visibleOnly: false, edgeY: 200 });
		}.bind(this))
		.fail(function( jqXHR, textStatus, errorThrown ) {
			showAjaxError(errorThrown);
		});
	},
	render:function(){
		var yearVal='請選擇年度';
		if(this.state.y!=null){
			var yearVal='年';
		}
		var outHtml = (
		<div>
		<ul className="breadcrumb">
		<li className="s"><a href="Index">HOME</a></li>
		<li><a href="Activities_list">活動花絮</a></li>
		<li>{this.state.y} {yearVal}</li>
		</ul>
			<div className="search">
				<label>選擇查詢年度</label>
				<select name="engines" onChange={this.yearChange}>
					<option selected="selected">選擇年度</option>
					<option value="2015">2015</option>
					<option value="2014">2014</option>
					<option value="2013">2013</option>
					<option value="2012">2012</option>
					<option value="2011">2011</option>
					<option value="2010">2010</option>
					<option value="2009">2009</option>
					<option value="2008">2008</option>
				</select>
				<span>
					<input type="text" placeholder="請輸入關鍵字" valueLink={this.linkState('searchKey')} />
					<button onClick={this.search}>搜尋</button>
				</span>
			</div>

			<div className="album">
			{
				this.state.gridData.rows.map(function(itemData,i) {
					var subOutHtml = <Figcaption key={itemData.流水號} itemData={itemData} />;
					return subOutHtml;
				})
			}
			</div>
		</div>
			);
		return outHtml;
	}
});

//元件嵌入 div id:PageContent
var comp = React.render(<PageContent dataUrl={gb_approot + 'api/GetAction/GetActiveAllWWW'} />,document.getElementById('PageContent'));