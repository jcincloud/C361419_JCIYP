//[1]
//主元件 
var PageContent = React.createClass({displayName: "PageContent",
	mixins: [React.addons.LinkedStateMixin], 
	getInitialState: function() {  
		return { 
			contentData:{}
		};  
	},		
	componentDidMount:function(){

		jqGet(gb_approot + 'api/GetAction/GetNewsContentWWW',{id:gb_id})
		.done(function(data, textStatus, jqXHRdata) {
			this.setState({contentData:data});
		}.bind(this))
		.fail(function( jqXHR, textStatus, errorThrown ) {
			showAjaxError(errorThrown);
		});

		return;
	},
	render:function(){
		var context = null;
		if(this.state.contentData.內容!=undefined){
			context = this.state.contentData.內容.replace(replace_br,'<br />');
		}

		var outHtml = (
		React.createElement("div", null, 
			React.createElement("article", null, 
				React.createElement("div", {className: "date"}, 
					React.createElement("span", null, moment(this.state.contentData.活動日期).format('DD')), 
					React.createElement("span", null, moment(this.state.contentData.活動日期).format('MMMM')), 
					React.createElement("span", null, moment(this.state.contentData.活動日期).format('YYYY'))
				), 

				React.createElement("h3", null, this.state.contentData.標題), 
				React.createElement("fieldset", null, 
					React.createElement("legend", null, "活動資訊"), 
					React.createElement("div", {className: "editor", dangerouslySetInnerHTML: {__html:context}})
				)
			), 
			React.createElement(AppenFile, {main_id: gb_id, file_kind: "file1", url_list: gb_approot + 'News/aj_FList'})
		)
			);

		return outHtml;
	}
});


var AppenFile = React.createClass({displayName: "AppenFile",
	getInitialState: function() {  
		return { 
			files:{filesObject:[]}
		};  
	},
	getDefaultProps:function(){
		return{
			main_id:0,
			url_list:null,
			file_kind:null
		};
	},	
	componentDidMount:function(){

		jqPost(this.props.url_list,{id:this.props.main_id,filekind:this.props.file_kind})
		.done(function(data, textStatus, jqXHRdata) {
			this.setState({files:data});
		}.bind(this))
		.fail(function( jqXHR, textStatus, errorThrown ) {
			showAjaxError(errorThrown);
		});

		return;
	},
	render:function(){
		var outHtml = (
		React.createElement("div", null, 
			React.createElement("section", {className: "download"}, 
				React.createElement("h6", null, "相關檔案下載:"), 
				
					this.state.files.filesObject.map(function(itemData,i) 
					{
						var alink = React.createElement("a", {href: itemData.OriginFilePath, target: "_blank"}, itemData.FileName);
						return alink;
					}.bind(this))
				
			)
		)
		);

		return outHtml;
	}
});


//元件嵌入 div id:PageContent
var comp = React.render(React.createElement(PageContent, {dataUrl: gb_approot + 'api/GetAction/GetNewsWWW', contextUrl: gb_approot + 'News/News_content?id='}),document.getElementById('PageContent'));