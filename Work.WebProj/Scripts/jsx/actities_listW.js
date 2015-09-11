var Figcaption = React.createClass({displayName: "Figcaption",
	getInitialState: function() {  
		return { 
		};  
	},
	render:function(){	
		var img = null;
		if(this.props.itemData.imgsrc==undefined){
			img = React.createElement("img", {"data-src": gb_approot + 'Content/images/Activities/no_pic.jpg', className: "lazyLoading"})
		}else{
			img = React.createElement("img", {"data-src": this.props.itemData.imgsrc, className: "lazyLoading"})
		}
		//console.log(this.props.itemData.imgsrc);
		var outHtml = (
		React.createElement("figure", {className: "effect"}, 
			img, 
			React.createElement("figcaption", null, 
				React.createElement("h4", null, this.props.itemData.標題), 
				React.createElement("em", null, moment(this.props.itemData.活動日期).format('YYYY-MM-DD')), 
				React.createElement("p", null, 
				
					this.props.itemData.活動花絮內容.map(function(itemData,i) {
						var subOutHtml = React.createElement("a", {key: i, href: gb_approot + 'Activities/Activities_content?ID=' + this.props.itemData.流水號 + '&tag=' + itemData.流水號 + '#' + itemData.流水號}, React.createElement("span", null, itemData.標題));
						return subOutHtml;
					}.bind(this))
				
				)
			)
		)
		);

		return outHtml;
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

		var outHtml = (
		React.createElement("div", null, 
			React.createElement("div", {className: "search"}, 
				React.createElement("label", null, "選擇查詢年度"), 
				React.createElement("select", {name: "engines", onChange: this.yearChange}, 
					React.createElement("option", {selected: "selected"}, "選擇年度"), 
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
					React.createElement("input", {type: "text", placeholder: "請輸入關鍵字", valueLink: this.linkState('searchKey')}), 
					React.createElement("button", {onClick: this.search}, "搜尋")
				)
			), 

			React.createElement("div", {className: "album"}, 
			
				this.state.gridData.rows.map(function(itemData,i) {
					var subOutHtml = React.createElement(Figcaption, {key: itemData.流水號, itemData: itemData});
					return subOutHtml;
				})
			
			)
		)
			);
		return outHtml;
	}
});

//元件嵌入 div id:PageContent
var comp = React.render(React.createElement(PageContent, {dataUrl: gb_approot + 'api/GetAction/GetActiveAllWWW'}),document.getElementById('PageContent'));