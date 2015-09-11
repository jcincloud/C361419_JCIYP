var GridButtonModify = React.createClass({displayName: "GridButtonModify",
	getInitialState: function() {  
		return { 
			value:'a'
		};  
	},
	onClick:function(e){
		this.props.modify();
	},
	render:function(){
		return (
			React.createElement("button", {type: "button", className: "btn-link btn-lg", onClick: this.onClick}, React.createElement("i", {className: "fa-pencil"}))
			);
	}
});

var GridButtonView = React.createClass({displayName: "GridButtonView",
	getInitialState: function() {  
		return { 
		};  
	},
	onClick:function(e){
		this.props.modify();
	},
	render:function(){
		return (
			React.createElement("button", {type: "button", className: "btn-link btn-lg", onClick: this.onClick}, React.createElement("i", {className: "fa-search-plus"}))
			);
	}
});

var GridCheckDel = React.createClass({displayName: "GridCheckDel",
	getInitialState: function() {  
		return { 
		};  
	},
	onChange:function(e){
		this.props.delCheck(this.props.iKey,this.props.chd);
	},
	render:function(){
		return (
			React.createElement("label", {className: "cbox"}, 
				React.createElement("input", {type: "checkbox", checked: this.props.chd, onChange: this.onChange}), 
				React.createElement("i", {className: "fa-check"})
			)
			);
	}
});

var GridNavPage = React.createClass({displayName: "GridNavPage",
	getInitialState: function() {  
		return {
		};  
	},
	getDefaultProps:function(){
		return{
			gridData:null,
			onQueryGridData:null,
			InsertType:0,
			UpdateType:null,
			deleteSubmit:null,
			showAdd:true,
			showDelete:true
		};
	},
	firstPage:function(){
		this.props.onQueryGridData(1);
	},
	lastPage:function(){
		this.props.onQueryGridData(this.props.TotalPage);
	},
	nextPage:function(){
		if(this.props.NowPage < this.props.TotalPage){
			this.props.onQueryGridData(this.props.NowPage + 1);
		}
	},
	prvePage:function(){
		if(this.props.NowPage > 1){
			this.props.onQueryGridData(this.props.NowPage - 1);
		}
	},
	jumpPage:function(){

	},
	render:function(){

		var setAddButton = null,setDeleteButton=null;
		if(this.props.showAdd){
			setAddButton = React.createElement("button", {className: "btn-link text-success", 
			                type: "button", 
			                onClick: this.props.InsertType}, 
			            	React.createElement("i", {className: "fa-plus-circle"}), " 新增"
			        		);			        		
		}

		if(this.props.showDelete){
			setDeleteButton = 	React.createElement("button", {className: "btn-link text-danger", type: "button", 
			                		onClick: this.props.deleteSubmit}, 
			            			React.createElement("i", {className: "fa-trash-o"}), " 刪除"
			        			);

		}
		var oper = null;

		oper = (
			React.createElement("div", {className: "table-footer"}, 
			    React.createElement("div", {className: "pull-left"}, 
			        setAddButton, 
			        setDeleteButton
			    ), 
			    React.createElement("small", {className: "pull-right"}, "第", this.props.StartCount, "-", this.props.EndCount, "筆，共", this.props.RecordCount, "筆"), 

			    React.createElement("ul", {className: "pager"}, 
			        React.createElement("li", null, 
			            React.createElement("a", {href: "#", title: "移至第一頁", tabIndex: "-1", onClick: this.firstPage}, 
			                React.createElement("i", {className: "fa-angle-double-left"})
			            )
			        ), " ", 
			        React.createElement("li", null, 
			            React.createElement("a", {href: "#", title: "上一頁", tabIndex: "-1", onClick: this.prvePage}, 
			                React.createElement("i", {className: "fa-angle-left"})
			            )
			        ), " ", 
			        React.createElement("li", {className: "form-inline"}, 
			            React.createElement("div", {className: "form-group"}, 
			                React.createElement("label", null, "第"), 
			                ' ', 
			                React.createElement("input", {className: "form-control", type: "number", min: "1", tabIndex: "-1", value: this.props.NowPage, 
			                       onChange: this.jumpPage}), 
			                ' ', 
			                React.createElement("label", null, "頁，共", this.props.TotalPage, "頁")
			            )
			        ), " ", 
			        React.createElement("li", null, 
			            React.createElement("a", {href: "#", title: "@Resources.Res.NextPage", tabIndex: "-1", onClick: this.nextPage}, 
			                React.createElement("i", {className: "fa-angle-right"})
			            )
			        ), " ", 
			        React.createElement("li", null, 
			            React.createElement("a", {href: "#", title: "移至最後一頁", tabIndex: "-1", onClick: this.lastPage}, 
			                React.createElement("i", {className: "fa-angle-double-right"})
			            )
			        )
			    )
			)
		);

		return oper;
	}
});

var GridNavPageOnlyView = React.createClass({displayName: "GridNavPageOnlyView",
	getInitialState: function() {  
		return {
		};  
	},
	firstPage:function(){
		this.props.onQueryGridData(1);
	},
	lastPage:function(){
		this.props.onQueryGridData(this.props.TotalPage);
	},
	nextPage:function(){
		if(this.props.NowPage < this.props.TotalPage){
			this.props.onQueryGridData(this.props.NowPage + 1);
		}
	},
	prvePage:function(){
		if(this.props.NowPage > 1){
			this.props.onQueryGridData(this.props.NowPage - 1);
		}
	},
	jumpPage:function(){

	},
	render:function(){
		var oper = null;

		oper = (
			React.createElement("div", {className: "table-footer"}, 
			    React.createElement("small", {className: "pull-right"}, "第", this.props.StartCount, "-", this.props.EndCount, "筆，共", this.props.RecordCount, "筆"), 

			    React.createElement("ul", {className: "pager"}, 
			        React.createElement("li", null, 
			            React.createElement("a", {href: "#", title: "移至第一頁", tabIndex: "-1", onClick: this.firstPage}, 
			                React.createElement("i", {className: "fa-angle-double-left"})
			            )
			        ), " ", 
			        React.createElement("li", null, 
			            React.createElement("a", {href: "#", title: "上一頁", tabIndex: "-1", onClick: this.prvePage}, 
			                React.createElement("i", {className: "fa-angle-left"})
			            )
			        ), " ", 
			        React.createElement("li", {className: "form-inline"}, 
			            React.createElement("div", {className: "form-group"}, 
			                React.createElement("label", null, "第"), 
			                ' ', 
			                React.createElement("input", {className: "form-control", type: "number", min: "1", tabIndex: "-1", value: this.props.NowPage, 
			                       onChange: this.jumpPage}), 
			                ' ', 
			                React.createElement("label", null, "頁，共", this.props.TotalPage, "頁")
			            )
			        ), " ", 
			        React.createElement("li", null, 
			            React.createElement("a", {href: "#", title: "@Resources.Res.NextPage", tabIndex: "-1", onClick: this.nextPage}, 
			                React.createElement("i", {className: "fa-angle-right"})
			            )
			        ), " ", 
			        React.createElement("li", null, 
			            React.createElement("a", {href: "#", title: "移至最後一頁", tabIndex: "-1", onClick: this.lastPage}, 
			                React.createElement("i", {className: "fa-angle-double-right"})
			            )
			        )
			    )
			)
		);

		return oper;
	}
});


//日期輸入元件
var InputDate = React.createClass({displayName: "InputDate",
	mixins: [React.addons.LinkedStateMixin], 
	getInitialState: function() {  
		return { 
		};  
	},
	getDefaultProps:function(){
		return{	
			value:null,
			onChange:null,
			name:null
		};
	},
	componentDidMount:function(){
		$('#' + this.props.id).datetimepicker(
			{
				format:'YYYY-MM-DD',
				icons: {
					previous: "fa-angle-left",
	                next: "fa-angle-right"
				}
			}).on('dp.change',function(e){
				this.props.onChange(this.props.name,e);
			}.bind(this));
	},
	componentDidUpdate:function(prevProps, prevState){
	},
	componentWillUnmount:function(){
	},
	onChange:function(e){
		this.props.onChange(this.props.name,e);
	},
	render:function(){

		return (
				React.createElement("input", {
					type: "date", 
					className: "form-control datetimepicker", 
					id: this.props.id, 
					name: this.props.name, 
					value: this.props.value!=undefined ? moment(this.props.value).format('YYYY-MM-DD'):'', 
					onChange: this.onChange, 
					required: true})
			);
		}
});

//Image共用元件 前台用
var ImgList = React.createClass({displayName: "ImgList",
	getInitialState: function() {  
		return { 
		};  
	},
	getDefaultProps:function(){
		//預設值
		return{	
			SetClass:null,
			NoImagePath:gb_approot + 'Content/images/Activities/no_pic.jpg'
		};
	},
	render:function(){	
		
		if(this.props.imgsrc!=undefined){
			return React.createElement("img", {src: this.props.imgsrc, className: this.props.SetClass});
		}else{
			return React.createElement("img", {src: this.props.NoImagePath, className: this.props.SetClass});
		}
	}
});

//後端文件上下傳
var MasterDocFileUpload = React.createClass({displayName: "MasterDocFileUpload",
	getInitialState: function() {  
		return {
			filelist:[],
			download_src:null
		};  
	},
	getDefaultProps:function(){
		return{	
			url_upload:null,
			url_list:null,
			url_delete:null,
			url_download:null,
			FileKind:null,
			MainId:0,
			uploader:null
		};
	},
	componentDidUpdate:function(prevProps, prevState){
		//this.getFileList();
	},
	componentDidMount:function(){
		if(this.props.MainId>1){
			this.createFileUpLoadObject();
			this.getFileList();
		}
	},
	componentWillReceiveProps:function(nextProps){
		
	},
	componentWillUnmount:function(){
		console.log('MasterFileUpload','destroy');
		if(this.props.uploader!=null){
			this.props.uploader.destroy();
		}
	},
	changeFDValue:function(name,e){
		this.props.SetSubInputValue(this.props.ikey,name,e);
	},
	deleteFile:function(filename){
		jqPost(this.props.url_delete,{
			id:this.props.MainId,
			fileKind:this.props.FileKind,
			filename:filename
		})			
		.done(function(data, textStatus, jqXHRdata) {
			if(data.result){
				this.getFileList();
			}else{
				alert(data.message);
			}
		}.bind(this))
		.fail(function( jqXHR, textStatus, errorThrown ) {
			showAjaxError(errorThrown);
		});
	},
	getFileList:function(){
		jqPost(this.props.url_list,{
			id:this.props.MainId,
			fileKind:this.props.FileKind
		})			
		.done(function(data, textStatus, jqXHRdata) {
			if(data.result){
				this.setState({filelist:data.filesObject})
			}else{
				alert(data.message);
			}
		}.bind(this))
		.fail(function( jqXHR, textStatus, errorThrown ) {
			showAjaxError(errorThrown);
		});
	},
	downloadFile:function(id,filekind,filename){
		var parms = [];
		parms.push('id=' + id);
		parms.push('filekind=' + filekind);
		parms.push('filename=' + filename);
		parms.push('tid=' + uniqid());
		var src = this.props.url_download + '?' + parms.join('&');
		this.setState({download_src:src});
	},
	createFileUpLoadObject:function(){
			var btn = document.getElementById('upload-btn-' + this.props.MainId);
			var r_this = this;
		  	this.props.uploader = new ss.SimpleUpload({
		        button: btn,
		        url: this.props.url_upload,
		        data:{
		        	id:this.props.MainId,
		        	fileKind:this.props.FileKind
		        },
		        name: 'fileName',
		        multiple: true,
		        maxSize: 5000,
		        allowedExtensions: ['pdf', 'doc', 'docx','xls','xlsx','txt','png'],
		        responseType: 'json',
				onSubmit: function(filename, ext) {            
					if(r_this.props.MainId==0){
						alert('此筆資料未完成新增，無法上傳檔案!')
						return false;
					}

					btn.value = ''; 

				},
				onProgress:function(pct){
					console.log('Progress',pct);
				},		
				onSizeError: function() {
		                errBox.innerHTML = 'Files may not exceed 500K.';
				},
				onExtError: function() {
		              errBox.innerHTML = 'Invalid file type. Please select a PNG, JPG, GIF image.';
				},
		        onComplete: function(file, response) {
		        	if(response.result){ 
						r_this.getFileList();
					}else{

					}
		        }
			});
	},
	render: function() {

		var outHtml = null;
		var fileButtonHtml=null;
		if (this.props.ParentEditType==1) {

		}else if(this.props.ParentEditType==2){
			fileButtonHtml=(
			React.createElement("div", {className: "form-control"}, 
				React.createElement("input", {type: "file", id: 'upload-btn-' + this.props.MainId})
			)
				);
		};
		outHtml=(				
		React.createElement("div", null, 
			fileButtonHtml, 
			React.createElement("p", {className: "help-block"}, 
			
				this.state.filelist.map(function(itemData,i) {
					var  subOutHtml =
					React.createElement("span", {className: "doc-upload", key: i}, 
						React.createElement("i", {className: "fa-file-text-o"}), 
						React.createElement("button", {type: "button", className: "close", onClick: this.deleteFile.bind(this,itemData.FileName)}, "×"), 
						React.createElement("button", {type: "button", className: "btn-link", onClick: this.downloadFile.bind(this,this.props.MainId,this.props.FileKind,itemData.FileName)}, 
						itemData.FileName
						)
					);
					return subOutHtml;
				},this)
			
			), 
			React.createElement("iframe", {src: this.state.download_src, style:  {visibility:'hidden',display:'none'} })
		)
		);
		return outHtml;
	}
});

var MasterDocFileUploadView = React.createClass({displayName: "MasterDocFileUploadView",
	getInitialState: function() {  
		return {
			filelist:[],
			download_src:null
		};  
	},
	getDefaultProps:function(){
		return{	
			url_upload:null,
			url_list:null,
			url_delete:null,
			url_download:null,
			FileKind:null,
			MainId:0
		};
	},
	componentDidUpdate:function(prevProps, prevState){
		//this.getFileList();
	},
	componentDidMount:function(){
		if(this.props.MainId>1){
			this.getFileList();
		}
	},
	componentWillReceiveProps:function(nextProps){
		
	},
	changeFDValue:function(name,e){
		this.props.SetSubInputValue(this.props.ikey,name,e);
	},
	getFileList:function(){
		jqPost(this.props.url_list,{
			id:this.props.MainId,
			fileKind:this.props.FileKind
		})			
		.done(function(data, textStatus, jqXHRdata) {
			if(data.result){
				this.setState({filelist:data.filesObject})
			}else{
				alert(data.message);
			}
		}.bind(this))
		.fail(function( jqXHR, textStatus, errorThrown ) {
			showAjaxError(errorThrown);
		});
	},
	downloadFile:function(id,filekind,filename){
		var parms = [];
		parms.push('id=' + id);
		parms.push('filekind=' + filekind);
		parms.push('filename=' + filename);
		parms.push('tid=' + uniqid());
		var src = this.props.url_download + '?' + parms.join('&');
		this.setState({download_src:src});
	},
	render: function() {

		var outHtml = null;

		outHtml=(				
		React.createElement("div", null, 
			React.createElement("p", {className: "help-block"}, 
			
				this.state.filelist.map(function(itemData,i) {
					var  subOutHtml =
					React.createElement("span", {className: "doc-upload", key: i}, 
						React.createElement("i", {className: "fa-file-text-o"}), 
						React.createElement("button", {type: "button", className: "btn-link", onClick: this.downloadFile.bind(this,this.props.MainId,this.props.FileKind,itemData.FileName)}, 
						itemData.FileName
						)
					);
					return subOutHtml;
				},this)
			
			), 
			React.createElement("iframe", {src: this.state.download_src, style:  {visibility:'hidden',display:'none'} })
		)
		);
		return outHtml;
	}
});

//前台換頁
var PageWWW = React.createClass({displayName: "PageWWW",
	getInitialState: function() {  
		return {

		};  
	},
	getDefaultProps:function(){
		return{	
			pageFirst:null,
			pagePrve:null,
			page:null,
			pageSelect:null,
			pageNext:null,
			pageLast:null,
			total:null
		};
	},
	render: function() {

		var outHtml = null;

		outHtml=(				
			React.createElement("form", null, 
				React.createElement("ul", {className: "pagination"}, 
					React.createElement("li", null, React.createElement("button", {type: "button", onClick: this.props.pageFirst, disabled: this.props.page==1}, "第一頁")), 
					React.createElement("li", null, React.createElement("button", {type: "button", onClick: this.props.pagePrve, disabled: this.props.page==1}, "上一頁")), 
					React.createElement("li", null, 
						React.createElement("select", {value: this.props.page, onChange: this.props.pageSelect}, 
							this.props.dpage
						)
					), 
					React.createElement("li", null, React.createElement("button", {type: "button", onClick: this.props.pageNext, disabled: this.props.page==this.props.total}, "下一頁")), 
					React.createElement("li", null, React.createElement("button", {type: "button", onClick: this.props.pageLast, disabled: this.props.page==this.props.total}, "最末頁"))
				), 
				React.createElement("p", {className: "pager"}, 
					"目前位於第", 
					React.createElement("input", {type: "number", value: this.props.page, onChange: this.props.pageSelect}), 
					"頁，共", 
					React.createElement("span", null, this.props.total), 
					"頁"
				)
			)
		);
		return outHtml;
	}
});