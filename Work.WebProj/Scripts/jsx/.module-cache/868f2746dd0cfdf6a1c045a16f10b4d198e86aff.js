
var PageContent = React.createClass({displayName: "PageContent",
	mixins: [React.addons.LinkedStateMixin], 
	getInitialState: function() {  
		return { 
			gridData:{rows:[]},
			page:1,
			y:null,
			keyword:null
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
		jqGet(this.props.dataUrl,{page:page,y:this.state.y,keyword:this.state.keyword})
		.done(function(data, textStatus, jqXHRdata) {
			this.setState({gridData:data,page:page});
		}.bind(this))
		.fail(function( jqXHR, textStatus, errorThrown ) {
			showAjaxError(errorThrown);
		});
	},
	queryDataY:function(y){
		jqGet(this.props.dataUrl,{page:1,y:y,keyword:this.state.keyword})
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
			React.createElement("div", {className: "search"}, 
				React.createElement("label", null, "選擇查詢年度"), 
				React.createElement("select", {onChange: this.yearChange}, 
					React.createElement("option", {value: ""}, "選擇年度"), 
					React.createElement("option", {value: "2015"}, "2015"), 
					React.createElement("option", {value: "2014"}, "2014"), 
					React.createElement("option", {value: "2013"}, "2013"), 
					React.createElement("option", {value: "2012"}, "2012"), 
					React.createElement("option", {value: "2011"}, "2011"), 
					React.createElement("option", {value: "2010"}, "2010"), 
					React.createElement("option", {value: "2009"}, "2009"), 
					React.createElement("option", {value: "2008"}, "2008")
				), 
				React.createElement("span", null, 
					React.createElement("input", {type: "text", placeholder: "請輸入關鍵字", valueLink: this.linkState('keyword')}), 
					React.createElement("button", {type: "button", onClick: this.yearChange}, "搜尋")
				)
			), 
			React.createElement("div", {className: "table-responsive"}, 
				React.createElement("table", {className: "news-list"}, 
					React.createElement("tr", null, 
						React.createElement("th", null, "發佈時間"), 
						React.createElement("th", null, "標題")
					), 
					
						this.state.gridData.rows.map(function(itemData,i) {
							var subOutHtml = 
							React.createElement("tr", null, 
							React.createElement("td", null, moment(itemData.活動日期).format('YYYY-MM-DD')), 
							React.createElement("td", null, React.createElement("a", {href: this.props.contextUrl + itemData.流水號}, itemData.標題))
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

var comp = React.render(React.createElement(PageContent, {dataUrl: gb_approot + 'api/GetAction/GetShareWWW', contextUrl: gb_approot + 'Doc/Doc_content?id='}),document.getElementById('PageContent'));