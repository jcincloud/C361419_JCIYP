	//[1-1]
	//子元件 Section區段
	var SectionText = React.createClass({displayName: "SectionText",
		mixins: [React.addons.LinkedStateMixin], 
		getInitialState: function() {  
			return { 
				textData:[]
			};  
		},
		componentDidMount:function(){

			jqGet(this.props.dataUrl,{page:1,y:null,keyword:null})
			.done(function(data, textStatus, jqXHRdata) {
				this.setState({textData:data.rows});
			}.bind(this))
			.fail(function( jqXHR, textStatus, errorThrown ) {
				showAjaxError(errorThrown);
			});
			return;
		},
		shouldComponentUpdate:function(nextProps,nextState){
			return true;
		},
		render:function(){

			var outHtml = (
	        	React.createElement("section", {id: this.props.sectionId}, 
	            	React.createElement("h4", null, this.props.sectionTitle), 
	            	React.createElement("ul", null, 
					
						this.state.textData.map(function(itemData,i) {
							var subOutHtml = React.createElement("li", {key: i}, React.createElement("a", {href: this.props.contextUrl + itemData.流水號}, React.createElement("em", null, moment(itemData.活動日期).format('YYYY-MM-DD')), itemData.標題));
							return subOutHtml;
						}.bind(this))
					
	            	)
	        	)
				);

			return outHtml;
		}
	});

	//[1-2]
	//子元件 Section區段 圖片
	var SectionPhoto = React.createClass({displayName: "SectionPhoto",
		mixins: [React.addons.LinkedStateMixin], 
		getInitialState: function() {  
			return { 
				textData:[]
			};  
		},
		componentDidMount:function(){
			jqGet(this.props.dataUrl,{page:1,y:null})
			.done(function(data, textStatus, jqXHRdata) {
				this.setState({textData:data.rows});
			}.bind(this))
			.fail(function( jqXHR, textStatus, errorThrown ) {
				showAjaxError(errorThrown);
			});
			return;
		},
		shouldComponentUpdate:function(nextProps,nextState){
			return true;
		},
		render:function(){

			var outHtml = (
	        	React.createElement("section", {id: this.props.sectionId}, 
	            	React.createElement("h4", null, this.props.sectionTitle), 
	            	React.createElement("ol", {className: "pic-list"}, 
					
						this.state.textData.map(function(itemData,i) {
							var subOutHtml = 
							React.createElement("li", {key: i}, React.createElement("a", {href: this.props.contextUrl + itemData.流水號}, 
							React.createElement(ImgList, {imgsrc: itemData.imgsrc}), 
							React.createElement("em", null, moment(itemData.活動日期).format('YYYY-MM-DD'), " ", itemData.標題)
							)
							);
							return subOutHtml;
						}.bind(this))
					
	            	)
	        	)
				);

			return outHtml;
		}
	});	

//[1]
//主元件 Tabs集合區段
var TabTexts = React.createClass({displayName: "TabTexts",
	mixins: [React.addons.LinkedStateMixin], 
	getInitialState: function() {  
		return { 
		};  
	},
	render:function(){

		var outHtml = (
			React.createElement("span", null, 
				React.createElement(SectionText, {sectionId: "sec1", sectionTitle: "LATEST NEWS", dataUrl: gb_approot + 'api/GetAction/GetNewsWWW', contextUrl: gb_approot + 'News/News_content?id='}), 
				React.createElement(SectionPhoto, {sectionId: "sec2", sectionTitle: "ACTIVITIES", dataUrl: gb_approot + 'api/GetAction/GetActiveWWW', contextUrl: gb_approot + 'Activities/Activities_content?id='}), 
				React.createElement(SectionText, {sectionId: "sec3", sectionTitle: "EXPERIENCES", dataUrl: gb_approot + 'api/GetAction/GetShareWWW', contextUrl:  gb_approot + 'Doc/Doc_content?id='}), 
				React.createElement(SectionText, {sectionId: "sec4", sectionTitle: "MEETING MINUTES", dataUrl: gb_approot+'api/GetAction/GetMeetingWWW', contextUrl: gb_approot + 'Doc/Doc_content?id='}), 
				React.createElement(SectionPhoto, {sectionId: "sec5", sectionTitle: "VIDEOS", dataUrl: gb_approot+'api/GetAction/GetActiveWWW', contextUrl: gb_approot + 'Activities/Activities_content?id='})
			)
			);

		return outHtml;
	}
});

//程式簽入 id:tabContent
var comp = React.render(React.createElement(TabTexts, null),document.getElementById('tabContent'));


var BannerRotator = React.createClass({displayName: "BannerRotator",
	getInitialState: function() {  
		return {
			banner_data:[]
		};  
	},	
	componentDidMount:function(){

		jqGet(gb_approot + 'api/GetAction/GetBannerWWW',{})
		.done(function(data, textStatus, jqXHRdata) {
			this.setState({banner_data:data});
			$('#banner').flexslider({
				slideshowSpeed: 6000
            });
		}.bind(this))
		.fail(function(jqXHR, textStatus, errorThrown) {
			showAjaxError(errorThrown);
		});
	},
	render:function(){

		var outHtml = 
		(
		React.createElement("div", {id: "banner", className: "flexslider"}, 
			React.createElement("ul", {className: "slides"}, 
			
				this.state.banner_data.map(function(itemData,i) {
					var subOutHtml = 
					React.createElement("li", {key: i}, 
					
						itemData.imgsrc.map(function(subitemData,i2) {
							var subImgOutHtml = React.createElement("span", {key: i2}, React.createElement("a", {href: subitemData, className: "fresco", "data-fresco-group": "shared_options"}, React.createElement("img", {src: subitemData})));
							return subImgOutHtml;
						})
					
					);
					return subOutHtml ;
				}.bind(this))
			
			)
		)
		);

		return outHtml;
	}
});

React.render(React.createElement(BannerRotator, null),document.getElementById('bannerContent'));