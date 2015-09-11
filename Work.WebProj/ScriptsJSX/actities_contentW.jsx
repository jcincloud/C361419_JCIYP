var ImgsContent = React.createClass({
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
				imgs.push(<li className="item"><a href={src} className="fresco" data-fresco-group="shared_options"><img data-src={src} /></a></li>);
			}
		}
		outHtml = <ol className="pic-list">{imgs}</ol>;

		return outHtml;
	}
});

//[1]
//主元件 
var PageContent = React.createClass({
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
		var yearVal=moment(this.state.contentData.活動日期).format('YYYY');
		document.title='中壢國際青年商會黃頁:活動花絮:'+this.state.contentData.標題;
		var outHtml = (
		<div>
			<ul className="breadcrumb">
				<li className="s"><a href="Index">HOME</a></li>
				<li><a href="Activities_list">活動花絮</a></li>
				<li><a href={'Activities_list/'+yearVal}>{yearVal}年</a></li>
				<li>{this.state.contentData.標題}</li>
			</ul>
			<div className="share">
				{/*fb分享 data-href需輸入網址參數*/}
				<div className="fb-share-button" data-href={gb_approot + 'Activities/Activities_content?id='+gb_id+'&tt='+getDateString()} data-type="button"></div>
				{/*g+分享 url=需輸入網址參數*/}
				<a className="g-plus" href={'https://plus.google.com/share?url={http://www.jciyp.org.tw/Activities/Activities_content?id='+this.state.contentData.流水號+'}'} onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;">
					<img src="https://www.gstatic.com/images/icons/gplus-16.png" alt="Share on Google+"/>
				</a>

			</div>
			<h3 id="actitiesTitle"><em>{moment(this.state.contentData.活動日期).format('YYYY-MM-DD')}</em>{this.state.contentData.標題}</h3>
			{
				this.state.contentData.IContext.map(function(itemData,i) {
					var subImgUrl=null;
					if(itemData.相簿連結!=null){
						subImgUrl=(<a className="more" target="_blank" href={itemData.相簿連結}>看更多照片</a>);
					}
					var subOutHtml = 
					<div key={i}><h4 id={itemData.流水號}>{itemData.標題}</h4>
						<ImgsContent key={i} srcs={itemData.imgsrc} />
						{subImgUrl}
					</div>;
					return subOutHtml;
				}.bind(this))
			}
		</div>
			);

		return outHtml;
	}
});

//元件嵌入 div id:PageContent
var comp = React.render(<PageContent contextUrl={gb_approot + 'api/GetAction/GetActiveContentWWW?id='} />,document.getElementById('PageContent'));



