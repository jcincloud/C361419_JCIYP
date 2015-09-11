var MembersTd = React.createClass({displayName: "MembersTd",
	mixins: [React.addons.LinkedStateMixin], 
	getInitialState: function() {  
		return { 
		};  
	},		
	componentDidMount:function(prevProps, prevState){
	},
	render:function(){

		var outHtml = (
			React.createElement("td", null, 
				
					this.props.MemberItem.map(function(itemData,i) {
						var subOutHtml = 
						React.createElement("span", null, itemData, " │");
						return subOutHtml;
					}.bind(this))	
				
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
			gridData:[],
		};  
	},		
	componentDidMount:function(prevProps, prevState){

		jqGet(gb_approot + 'api/GetAction/GetMemberWWW',{})
		.done(function(data, textStatus, jqXHRdata) {
			this.setState({gridData:data});
		}.bind(this))
		.fail(function( jqXHR, textStatus, errorThrown ) {
			showAjaxError(errorThrown);
		});
	},
	render:function(){

		var outHtml = (
		React.createElement("div", {className: "table-responsive"}, 
			React.createElement("table", {className: "pro-list"}, 
				React.createElement("tr", null, 
					React.createElement("th", null, "入會年度"), React.createElement("th", null, "姓名")
				), 
				
					this.state.gridData.map(function(itemData,i) {
						var subOutHtml = 
						React.createElement("tr", null, 
							React.createElement("td", null, "民國 ", itemData.Key-1911, " - 西元 ", itemData.Key, " "), 
							React.createElement(MembersTd, {MemberItem: itemData.Item})
						);
						return subOutHtml;
					}.bind(this))	
				

			)
		)
			);
		return outHtml;
	}
});

//元件嵌入 div id:PageContent
var comp = React.render(React.createElement(PageContent, {dataUrl: gb_approot + 'api/GetAction/GetActiveAllWWW'}),document.getElementById('PageContent'));