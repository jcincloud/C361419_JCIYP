var ImgList = React.createClass({displayName: "ImgList",
	getInitialState: function() {  
		return { 
		};  
	},
	render:function(){	
		
		if(this.props.imgsrc!=undefined){
			return React.createElement("img", {src: this.props.imgsrc});
		}else{
			return React.createElement("img", {src: gb_approot + 'Content/images/Activities/no_pic.jpg'});
		}
	}
});


//[1]
//主元件 Tabs集合區段
var PageContent = React.createClass({displayName: "PageContent",
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
	render:function(){

		var dpage = [];
		for(var i=1;i<=this.state.gridData.total;i++){
			dpage.push(React.createElement("option", {value: i}, "第", i, "頁"));
		}
		var outHtml = (
		React.createElement("div", null, 
			React.createElement("div", {className: "table-responsive"}, 
				React.createElement("table", {className: "pro-list"}, 
					React.createElement("tr", null, 
						React.createElement("th", null, "產品"), 
						React.createElement("th", null, "介紹")
					), 
					
						this.state.gridData.rows.map(function(itemData,i) {

							var price = itemData.價格 == undefined ? '無':itemData.價格;

							var subOutHtml =
							React.createElement("tr", {key: i}, 
								React.createElement("td", null, React.createElement("a", {href: gb_approot + 'Member/Member_content?id=' + itemData.mid}, 
										React.createElement(ImgList, {imgsrc: itemData.imgsrc})
									)
								), 
								React.createElement("td", null, 
									React.createElement("p", null, "產品名稱：", React.createElement("a", {href: gb_approot + 'Member/Member_content?id=' + itemData.mid}, itemData.產品名稱)), 
									React.createElement("p", null, "參考價格：", React.createElement("em", null, price)), 
									React.createElement("p", {dangerouslySetInnerHTML: {__html:'產品特色：' + itemData.產品特色}}), 
									React.createElement("p", null, "供應商：", React.createElement("a", {href: gb_approot + 'Member/Member_content?id=' + itemData.mid}, itemData.姓名)), 
									React.createElement("p", null, "點閱率：", itemData.點閱率)
								)
							);

							return subOutHtml;
						}.bind(this))
					
				)
			), 

			React.createElement(PageWWW, {
				pageFirst: this.pageFirst, 
				pagePrve: this.pagePrve, 
				page: this.state.page, 
				pageSelect: this.pageSelect, 
				pageNext: this.pageNext, 
				pageLast: this.pageLast, 
				total: this.state.gridData.total, 
				dpage: dpage}
			)
		)
			);
		return outHtml;
	}
});

//元件嵌入 div id:PageContent
var comp = React.render(React.createElement(PageContent, {dataUrl: gb_approot + 'api/GetAction/GetBusinessWWW', 
	contextUrl: gb_approot + 'News/News_content?id='}),document.getElementById('PageContent'));