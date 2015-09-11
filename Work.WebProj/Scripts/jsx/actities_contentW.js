var ImgsContent = React.createClass({displayName: "ImgsContent",
	getInitialState: function() {  
		return { 
		};  
	},		
	componentDidMount:function(){
		return;
	},
	render:function(){
		var outHtml = null;
		var imgs = [];

		if(this.props.srcs!=undefined){
			for (var prop in this.props.srcs) {
				var src =  this.props.srcs[prop];
				imgs.push(React.createElement("li", {className: "item"}, React.createElement("a", {href: src, className: "fresco", "data-fresco-group": "shared_options"}, React.createElement("img", {"data-src": src}))));
			}
		}
		outHtml = React.createElement("ol", {className: "pic-list"}, imgs);

		return outHtml;
	}
});

//[1]
//主元件 
var PageContent = React.createClass({displayName: "PageContent",
	mixins: [React.addons.LinkedStateMixin], 
	getInitialState: function() {  
		return { 
			contentData:{IContext:[]}
		};  
	},		
	componentDidMount:function(){

		jqGet(gb_approot + 'api/GetAction/GetActiveContentWWW',{id:gb_id})
		.done(function(data, textStatus, jqXHRdata) {
			this.setState({contentData:data});
			$(window).lazyLoadXT({ visibleOnly: false, edgeY: 200 });
		}.bind(this))
		.fail(function( jqXHR, textStatus, errorThrown ) {
			showAjaxError(errorThrown);
		});

		return;
	},
	render:function(){

		var outHtml = (
		React.createElement("div", null, 
			React.createElement("h3", null, React.createElement("em", null, moment(this.state.contentData.活動日期).format('YYYY-MM-DD')), this.state.contentData.標題), 
			
				this.state.contentData.IContext.map(function(itemData,i) {
					var subOutHtml = 
					React.createElement("div", {key: i}, React.createElement("h4", {id: itemData.流水號}, itemData.標題), 
						React.createElement(ImgsContent, {key: i, srcs: itemData.imgsrc})
					);
					return subOutHtml;
				}.bind(this))
			
		)
			);

		return outHtml;
	}
});

//元件嵌入 div id:PageContent
var comp = React.render(React.createElement(PageContent, {contextUrl: gb_approot + 'api/GetAction/GetActiveContentWWW?id='}),document.getElementById('PageContent'));