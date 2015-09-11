//[1]
//主元件 
var PageContent = React.createClass({
	mixins: [React.addons.LinkedStateMixin], 
	getInitialState: function() {  
		return { 
			contentData:{}
		};  
	},		
	componentDidMount:function(){

		jqGet(gb_approot + 'api/GetAction/GetDocContent',{id:gb_id})
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

		document.title='中壢國際青年商會黃頁:心得分享:'+this.state.contentData.標題;

		var outHtml = (
		<div>
			<div className="share">
				{/*fb分享 data-href需輸入網址參數*/}
				<div className="fb-share-button" data-href={gb_approot + 'Doc/Doc_content?id='+gb_id+'&tt='+getDateString()} data-type="button"></div>
				{/*g+分享 url=需輸入網址參數*/}
				<a className="g-plus" href={'https://plus.google.com/share?url={http://www.jciyp.org.tw/Doc/Doc_content?id='+this.state.contentData.流水號+'}'} onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;">
					<img src="https://www.gstatic.com/images/icons/gplus-16.png" alt="Share on Google+"/>
				</a>

			</div>
			<article>
				<div className="date">
					<span>{moment(this.state.contentData.活動日期).format('DD')}</span>
					<span>{moment(this.state.contentData.活動日期).format('MMMM')}</span>
					<span>{moment(this.state.contentData.活動日期).format('YYYY')}</span>
				</div>

				<h3>{this.state.contentData.標題}</h3>
				<p className="editor" dangerouslySetInnerHTML={{__html:context}}></p>
			</article>
			<AppenFile main_id={gb_id} file_kind="file1" url_list={gb_approot + 'Doc/aj_FList'} />
		</div>
			);

		return outHtml;
	}
});

var AppenFile = React.createClass({
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
	PopupCenter:function(url, title, w, h, e) {
		e.preventDefault();
	    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
	    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

	    width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
	    height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

	    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
	    var top = ((height / 2) - (h / 2)) + dualScreenTop;
	    var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

	    if (window.focus) {
	        newWindow.focus();
	    }
	},
	render:function(){
		var outHtml = (
		<div>
			<section className="download">
				<h6>相關檔案下載:</h6>
				{
					this.state.files.filesObject.map(function(itemData,i) 
					{
						var alink = <a href="#" onClick={this.PopupCenter.bind(this,itemData.OriginFilePath,'new','780','720')}>{itemData.FileName}</a>;
						return alink;
					}.bind(this))
				}
			</section>
		</div>
		);

		return outHtml;
	}
});


//元件嵌入 div id:PageContent
var comp = React.render(<PageContent dataUrl={gb_approot + 'api/GetAction/GetNewsWWW'} contextUrl={gb_approot + 'News/News_content?id='} />,document.getElementById('PageContent'));