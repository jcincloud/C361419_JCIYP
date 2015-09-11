	//[1-1]
	//子元件 Section區段
	var SectionText = React.createClass({
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
	        	<section id={this.props.sectionId}>
	            	<h4>{this.props.sectionTitle}</h4>
	            	<ul>
					{
						this.state.textData.map(function(itemData,i) {
							var subOutHtml = <li key={i}><a href={this.props.contextUrl + itemData.流水號}><em>{moment(itemData.活動日期).format('YYYY-MM-DD')}</em>{itemData.標題}</a></li>;
							return subOutHtml;
						}.bind(this))
					}
	            	</ul>
	        	</section>
				);

			return outHtml;
		}
	});

	//[1-2]
	//子元件 Section區段 圖片
	var SectionPhoto = React.createClass({
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
	        	<section id={this.props.sectionId}>
	            	<h4>{this.props.sectionTitle}</h4>
	            	<ol className="pic-list">
					{
						this.state.textData.map(function(itemData,i) {
							var subOutHtml = 
							<li key={i}><a href={this.props.contextUrl + itemData.流水號}>
							<ImgList imgsrc={itemData.imgsrc} />
							<em>{moment(itemData.活動日期).format('YYYY-MM-DD')} {itemData.標題}</em>
							</a>
							</li>;
							return subOutHtml;
						}.bind(this))
					}
	            	</ol>
	        	</section>
				);

			return outHtml;
		}
	});	

//[1]
//主元件 Tabs集合區段
var TabTexts = React.createClass({
	mixins: [React.addons.LinkedStateMixin], 
	getInitialState: function() {  
		return { 
		};  
	},
	render:function(){

		var outHtml = (
			<span>
				<SectionText sectionId="sec1" sectionTitle="LATEST NEWS" dataUrl={gb_approot + 'api/GetAction/GetNewsWWW'} contextUrl={gb_approot + 'News/News_content?id='} />
				<SectionPhoto sectionId="sec2" sectionTitle="ACTIVITIES" dataUrl={gb_approot + 'api/GetAction/GetActiveWWW'} contextUrl={gb_approot + 'Activities/Activities_content?id='} />
				<SectionText sectionId="sec3" sectionTitle="EXPERIENCES" dataUrl={gb_approot + 'api/GetAction/GetShareWWW'} contextUrl={ gb_approot + 'Doc/Doc_content?id='} />
				<SectionText sectionId="sec4" sectionTitle="MEETING MINUTES" dataUrl={gb_approot+'api/GetAction/GetMeetingWWW'} contextUrl={gb_approot + 'Doc/Doc_content?id='} />
				<SectionPhoto sectionId="sec5" sectionTitle="VIDEOS" dataUrl={gb_approot+'api/GetAction/GetActiveWWW'} contextUrl={gb_approot + 'Activities/Activities_content?id='} />
			</span>
			);

		return outHtml;
	}
});

//程式簽入 id:tabContent
var comp = React.render(<TabTexts />,document.getElementById('tabContent'));


var BannerRotator = React.createClass({
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
		<div id="banner" className="flexslider">
			<ul className="slides">
			<li>
			    <span><a href="/jljc2015" target="_blank"><img src="/Content/images/Event/banner.jpg" alt="就是要劊業" /></a></span>
			    <span><a href="/jljc2015" target="_blank"><img src="/Content/images/Event/banner2.jpg" alt="創業競賽" /></a></span>
			    <span><a href="/jljc2015" target="_blank"><img src="/Content/images/Event/banner3.jpg" alt="創業論壇" /></a></span>
			    <span><a href="/jljc2015" target="_blank"><img src="/Content/images/Event/banner4.jpg" alt="創業大講" /></a></span>
			</li>
			{
				this.state.banner_data.map(function(itemData,i) {
					var subOutHtml = 
					<li key={i}>
					{
						itemData.imgsrc.map(function(subitemData,i2) {
							var subImgOutHtml = <span key={i2}><a href={subitemData} className="fresco" data-fresco-group="shared_options"><img src={subitemData} /></a></span>;
							return subImgOutHtml;
						})
					}
					</li>;
					return subOutHtml ;
				}.bind(this))
			}
			</ul>
		</div>
		);

		return outHtml;
	}
});

React.render(<BannerRotator />,document.getElementById('bannerContent'));


//首頁影片
var BennerVideo=React.createClass({
	mixins: [React.addons.LinkedStateMixin], 
		getInitialState: function() {  
		return {
			banner_data:[]
		};  
	},	
	componentDidMount:function(){

		jqGet(gb_approot + 'api/GetAction/GetBannerVideoWWW',{})
		.done(function(data, textStatus, jqXHRdata) {
			this.setState({banner_data:data});
		}.bind(this))
		.fail(function(jqXHR, textStatus, errorThrown) {
			showAjaxError(errorThrown);
		});
	},
	render:function(){

		var context = null;
		if(this.state.banner_data.video_iframe!=undefined){
			context = this.state.banner_data.video_iframe;
		}
		var outHtml = 
		(
			<div id="bannerVideo" dangerouslySetInnerHTML={{__html:context}}></div>	
		);

		return outHtml;
	}
});

React.render(<BennerVideo />,document.getElementById('VideoIframe'));
