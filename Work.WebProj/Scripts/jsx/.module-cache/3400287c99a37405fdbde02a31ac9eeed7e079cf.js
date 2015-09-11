
var MemberLoginContent = React.createClass({displayName: "MemberLoginContent",
	mixins: [React.addons.LinkedStateMixin], 
	getInitialState: function() {  
		return { 
		};  
	},		
	componentDidMount:function(){
		return;
	},
	mClick:function(e){

	},
	d1Click:function(e){

	},
	render:function(){
		var outHtml = (
			React.createElement("div", null, 
			    React.createElement("menu", null, 
			        React.createElement("button", {type: "button", id: "menu-toggle", className: "md-trigger icon-menu", "data-modal": "menu"}, "MENU"), 
			        React.createElement("button", {type: "button", className: "md-trigger icon-switch", "data-modal": "login"}, "LOGIN"), 
			        React.createElement("button", {type: "button", className: "md-trigger icon-plus", "data-modal": "joinus"}, "JOIN US")
			    ), 
		        React.createElement("div", {className: "md-modal", id: "login"}, 
		            React.createElement("div", {className: "md-content"}, 
		                React.createElement("h3", null, "LOGIN"), 
		                React.createElement("form", null, 
		                    React.createElement("p", null, React.createElement("label", null, "帳號"), React.createElement("input", {type: "text", required: true})), 
		                    React.createElement("p", null, React.createElement("label", null, "密碼"), React.createElement("input", {type: "password", required: true})), 
		                    React.createElement("ul", {className: "text-list"}, 
		                        React.createElement("li", null, "帳號為您的會員編號，密碼預設為出生年月日(例如610203)"), 
		                        React.createElement("li", null, "登入後請修改您的密碼，謝謝!")
		                    ), 
		                    React.createElement("button", {type: "submit", className: "btn"}, "登入")
		                ), 
		                React.createElement("button", {className: "md-close icon-close"}, "關閉視窗")
		            )
		        ), 
		        React.createElement("div", {className: "md-modal", id: "joinus"}, 
		            React.createElement("div", {className: "md-content"}, 
		                React.createElement("h3", null, "JOIN US"), 
		                React.createElement("form", null, 
		                    React.createElement("p", null, React.createElement("label", null, "姓名"), React.createElement("input", {type: "text"})), 
		                    React.createElement("p", null, React.createElement("label", null, "聯絡電話"), React.createElement("input", {type: "text"})), 
		                    React.createElement("p", null, React.createElement("label", null, "聯絡住址"), React.createElement("input", {type: "text"})), 
		                    React.createElement("p", null, React.createElement("label", null, "電子信箱"), React.createElement("input", {type: "text"})), 
		                    React.createElement("p", null, React.createElement("label", null, "興趣"), React.createElement("input", {type: "text"})), 
		                    React.createElement("button", {className: "btn", type: "submit"}, "送出資訊")
		                ), 
		                React.createElement("button", {className: "md-close icon-close"}, "關閉視窗")
		            )
		        )
			)
		);

		return outHtml;
	}
});

var compMemberLogin = React.render(React.createElement(MemberLoginContent, null),document.getElementById('MemberLogin'));