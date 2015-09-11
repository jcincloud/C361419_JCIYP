
var PageContent = React.createClass({displayName: "PageContent",
	mixins: [React.addons.LinkedStateMixin], 
	getInitialState: function() {  
		return { 
			contentData:{},
			productData:[]
		};  
	},		
	componentDidMount:function(){
		jqGet(gb_approot + 'api/GetAction/GetMemberContentWWW',{id:gb_id})
		.done(function(data, textStatus, jqXHRdata) {
			jqGet(gb_approot + 'api/GetAction/GetProductWWW',{id:gb_id})
			.done(function(sub_data, textStatus, jqXHRdata) {
				this.setState({contentData:data,productData:sub_data});
			}.bind(this))
			.fail(function( jqXHR, textStatus, errorThrown ) {
				showAjaxError(errorThrown);
			});
		}.bind(this))
		.fail(function( jqXHR, textStatus, errorThrown ) {
			showAjaxError(errorThrown);
		});
		return;
	},
	render:function(){

		var outHtml = (
		React.createElement("div", null, 
			React.createElement("section", {className: "float-l half"}, 
				React.createElement("h3", null, "基本資料"), 

				React.createElement(ImgList, {SetClass: "float-l", imgsrc: this.state.contentData.imgsrc_peoson}), 

				React.createElement("dl", {className: "text-list"}, 
					React.createElement("dt", null, "【姓　名】"), 
					React.createElement("dd", null, this.state.contentData.姓名, " (", this.state.contentData.點閱率, ")"), 

					React.createElement("dt", null, "【青商經歷】"), 
					React.createElement("dd", null, this.state.contentData.社團經歷)
				), 
				React.createElement("a", {href: "", className: "btn"}, "基本資料修改"), React.createElement("em", null, "(只能修改自己喔!!)")
			), 

			React.createElement("section", {className: "float-r half"}, 
				React.createElement("h3", null, "公司簡介"), 
				React.createElement(ImgList, {SetClass: "float-l", imgsrc: this.state.contentData.imgsrc_company}), 
				React.createElement("h4", null), 
				React.createElement("p", null, 
					this.state.contentData.公司簡介
				), 
				React.createElement("h4", null, "主要商品或服務項目"), 
				React.createElement("p", null, this.state.contentData.服務項目
				)
			), 

			React.createElement("section", {className: "clear"}, 
				React.createElement("h3", null, "產品簡介"), 
				React.createElement("div", {className: "table-responsive"}, 
					React.createElement("table", {className: "pro-list"}, 
					
						this.state.productData.map(function(itemData,i) {

							var subOutHtml =
							React.createElement("tr", {key: i}, 
							React.createElement("td", null, 
								React.createElement(ImgList, {imgsrc: itemData.imgsrc})
							), 
							React.createElement("td", null, 
								React.createElement("p", null, "產品名稱： ", React.createElement("em", null, itemData.產品名稱)), 
								React.createElement("p", null, "產品特色： ", itemData.產品特色), 
								React.createElement("p", null, "參考價格：", React.createElement("em", null, itemData.價格)), 
								React.createElement("p", null, "價格說明：", itemData.價格說明), 
								React.createElement("p", null, "點閱率：", React.createElement("em", null, itemData.點閱率))
							)
							);
							return subOutHtml;
						})
					
					)
				)
			)
		)
			);

		return outHtml;
	}
});

var comp = React.render(React.createElement(PageContent, null),document.getElementById('PageContent'));