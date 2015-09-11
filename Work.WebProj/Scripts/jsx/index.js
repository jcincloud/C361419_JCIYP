var SectionText = React.createClass({displayName: "SectionText",
	mixins: [React.addons.LinkedStateMixin], 
	getInitialState: function() {  
		return { 
		};  
	},
	render:function(){

		var outHtml = (
        	React.createElement("section", {id: this.props.sectionId}, 
            	React.createElement("h4", null, "LATEST NEWS"), 
            	React.createElement("ul", null, 
                	React.createElement("li", null, React.createElement("a", {href: "~/News/News_content"}, React.createElement("em", null, "2010/12/31"), "加入中壢青商＝投資您的未來！！加入中壢青商＝投資您的未來！！加入中壢青商＝投資您的未來！！加入中壢青商＝投資您的未來！！加入中壢青商＝投資您的未來！！加入中壢青商＝投資您的未來！！")), 
                	React.createElement("li", null, React.createElement("a", {href: "~/News/News_content"}, React.createElement("em", null, "2011/3/28"), "中壢國際青年商會的FaceBook中壢國際青年商會的FaceBook中壢國際青年商會的FaceBook")), 
                	React.createElement("li", null, React.createElement("a", {href: "~/News/News_content"}, React.createElement("em", null, "2011/12/28"), "101年度各項事務申請表格101年度各項事務申請表格101年度各項事務申請表格")), 
                	React.createElement("li", null, React.createElement("a", {href: "~/News/News_content"}, React.createElement("em", null, "2014/10/3"), "第四十一屆第四次理監事預備會第四十一屆第四次理監事預備會第四十一屆第四次理監事預備")), 
                	React.createElement("li", null, React.createElement("a", {href: "~/News/News_content"}, React.createElement("em", null, "2014/9/12"), "特友會老中青聯誼暨秋季月光晚會特友會老中青聯誼暨秋季月光晚會特友會老中青聯誼暨秋季")), 
                	React.createElement("li", null, React.createElement("a", {href: "~/News/News_content"}, React.createElement("em", null, "2014/9/28"), "九月份秋季聯歡暨月例會九月份秋季聯歡暨月例會九月份秋季聯歡暨月例會九月份")), 
                	React.createElement("li", null, React.createElement("a", {href: "~/News/News_content"}, React.createElement("em", null, "2014/9/10"), "第四十一屆第九次理事會第四十一屆第九次理事會第四十一屆第九次理事會")), 
                	React.createElement("li", null, React.createElement("a", {href: "~/News/News_content"}, React.createElement("em", null, "2014/10/6"), "第四十一屆第十次理事會"))
            	)
        	)
			);

		return outHtml;
	}
});


var tabTexts = React.createClass({displayName: "tabTexts",
	mixins: [React.addons.LinkedStateMixin], 
	getInitialState: function() {  
		return { 
		};  
	},
	render:function(){

		var outHtml = (
			React.createElement("span", null, 
				React.createElement(SectionText, {sectionId: "sec1"}), 
				React.createElement(SectionText, {sectionId: "sec2"}), 
				React.createElement(SectionText, {sectionId: "sec3"}), 
				React.createElement(SectionText, {sectionId: "sec4"})
			)
			);

		return outHtml;
	}
});
var getRootDOM = document.getElementById('tabContent');
var Comp = React.renderComponent(React.createElement("tabTexts", null),getRootDOM);