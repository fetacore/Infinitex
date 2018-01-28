ace.define("ace/theme/red",["require","exports","module","ace/lib/dom"], function(acequire, exports, module) {

exports.isDark = true;
exports.cssClass = "ace-red";
exports.cssText = ".ace-red .ace_gutter {\
background: #180000;\
color: #dedede;\
border-right: 1px solid #1c1c1c;\
}\
.ace-red .ace_gutter-cell.ace_warning {\
background-image: none;\
background: #FC0;\
border-left: none;\
padding-left: 0;\
color: #000;\
}\
.ace-red .ace_gutter-cell.ace_error {\
background-position: -6px center;\
background-image: none;\
background: #F10;\
border-left: none;\
padding-left: 0;\
color: #000;\
}\
.ace-red .ace_print-margin {\
border-left: 1px solid #555;\
right: 0;\
background: #1D1D1D;\
}\
.ace-red {\
background-color: #0e0000;\
color: #ffffff;\
}\
.ace-red .ace_cursor {\
border-left: 2px solid #FFFFFF;\
}\
.ace-red .ace_cursor.ace_overwrite {\
border-left: 0px;\
border-bottom: 1px solid #FFFFFF;\
}\
.ace-red .ace_marker-layer .ace_selection {\
background-color: #4f0000;\
}\
.ace-red .ace_marker-layer .ace_step {\
background: rgb(198, 219, 174);\
}\
.ace-red .ace_marker-layer .ace_bracket {\
margin: -1px 0 0 -1px;\
border: 1px solid #FCE94F;\
}\
.ace-red .ace_marker-layer .ace_active-line {\
background: #0b0000;\
}\
.ace-red .ace_gutter-active-line {\
background-color: #341111;\
}\
.ace-red .ace_invisible {\
color: #404040;\
}\
.ace-red .ace_keyword {\
color:#00698F;\
}\
.ace-red .ace_keyword.ace_operator {\
color:#FF308F;\
}\
.ace-red .ace_constant {\
color:#1EDAFB;\
}\
.ace-red .ace_constant.ace_language {\
color:#FDC251;\
}\
.ace-red .ace_constant.ace_library {\
color:#8DFF0A;\
}\
.ace-red .ace_constant.ace_numeric {\
color:#58C554;\
}\
.ace-red .ace_invalid {\
color:#FFFFFF;\
background-color:#990000;\
}\
.ace-red .ace_invalid.ace_deprecated {\
color:#FFFFFF;\
background-color:#990000;\
}\
.ace-red .ace_support {\
color: #999;\
}\
.ace-red .ace_support.ace_function {\
color:#00AEEF;\
}\
.ace-red .ace_function {\
color:#00AEEF;\
}\
.ace-red .ace_string {\
color:#58C554;\
}\
.ace-red .ace_comment {\
color:#555;\
font-style:italic;\
padding-bottom: 0px;\
}\
.ace-red .ace_variable {\
color:#997744;\
}\
.ace-red .ace_meta.ace_tag {\
color:#BE53E6;\
}\
.ace-red .ace_entity.ace_other.ace_attribute-name {\
color:#FFFF89;\
}\
.ace-red .ace_markup.ace_underline {\
text-decoration: underline;\
}\
.ace-red .ace_fold-widget {\
text-align: center;\
}\
.ace-red .ace_fold-widget:hover {\
color: #777;\
}\
.ace-red .ace_fold-widget.ace_start,\
.ace-red .ace_fold-widget.ace_end,\
.ace-red .ace_fold-widget.ace_closed{\
background: none;\
border: none;\
box-shadow: none;\
}\
.ace-red .ace_fold-widget.ace_start:after {\
content: '▾'\
}\
.ace-red .ace_fold-widget.ace_end:after {\
content: '▴'\
}\
.ace-red .ace_fold-widget.ace_closed:after {\
content: '‣'\
}\
.ace-red .ace_indent-guide {\
border-right:1px dotted #333;\
margin-right:-1px;\
}\
.ace-red .ace_fold { \
background: #222; \
border-radius: 3px; \
color: #7AF; \
border: none; \
}\
.ace-red .ace_fold:hover {\
background: #CCC; \
color: #000;\
}\
";

var dom = acequire("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);

});
