ace.define("ace/theme/darkGreen",["require","exports","module","ace/lib/dom"], function(acequire, exports, module) {

exports.isDark = true;
exports.cssClass = "ace-darkGreen";
exports.cssText = ".ace-darkGreen .ace_gutter {\
background: #062106;\
color: #fefefe;\
border-right: 1px solid #bababa;\
}\
.ace-darkGreen .ace_gutter-cell.ace_warning {\
background-image: none;\
background: #FC0;\
border-left: none;\
padding-left: 0;\
color: #000;\
}\
.ace-darkGreen .ace_gutter-cell.ace_error {\
background-position: -6px center;\
background-image: none;\
background: #F10;\
border-left: none;\
padding-left: 0;\
color: #000;\
}\
.ace-darkGreen .ace_print-margin {\
border-left: 1px solid #555;\
right: 0;\
background: #1D1D1D;\
}\
.ace-darkGreen {\
background-color: #061f06;\
color: #ffffff;\
}\
.ace-darkGreen .ace_cursor {\
border-left: 2px solid #FFFFFF;\
}\
.ace-darkGreen .ace_cursor.ace_overwrite {\
border-left: 0px;\
border-bottom: 1px solid #FFFFFF;\
}\
.ace-darkGreen .ace_marker-layer .ace_selection {\
background-color: #305d2d;\
}\
.ace-darkGreen .ace_marker-layer .ace_step {\
background: rgb(198, 219, 174);\
}\
.ace-darkGreen .ace_marker-layer .ace_bracket {\
margin: -1px 0 0 -1px;\
border: 1px solid #FCE94F;\
}\
.ace-darkGreen .ace_marker-layer .ace_active-line {\
background: #2a4426;\
}\
.ace-darkGreen .ace_gutter-active-line {\
background-color: #2a4426;\
}\
.ace-darkGreen .ace_invisible {\
color: #404040;\
}\
.ace-darkGreen .ace_keyword {\
color:#00698F;\
}\
.ace-darkGreen .ace_keyword.ace_operator {\
color:#FF308F;\
}\
.ace-darkGreen .ace_constant {\
color:#1EDAFB;\
}\
.ace-darkGreen .ace_constant.ace_language {\
color:#FDC251;\
}\
.ace-darkGreen .ace_constant.ace_library {\
color:#8DFF0A;\
}\
.ace-darkGreen .ace_constant.ace_numeric {\
color:#58C554;\
}\
.ace-darkGreen .ace_invalid {\
color:#FFFFFF;\
background-color:#990000;\
}\
.ace-darkGreen .ace_invalid.ace_deprecated {\
color:#FFFFFF;\
background-color:#990000;\
}\
.ace-darkGreen .ace_support {\
color: #999;\
}\
.ace-darkGreen .ace_support.ace_function {\
color:#00AEEF;\
}\
.ace-darkGreen .ace_function {\
color:#00AEEF;\
}\
.ace-darkGreen .ace_string {\
color:#58C554;\
}\
.ace-darkGreen .ace_comment {\
color:#555;\
font-style:italic;\
padding-bottom: 0px;\
}\
.ace-darkGreen .ace_variable {\
color:#997744;\
}\
.ace-darkGreen .ace_meta.ace_tag {\
color:#BE53E6;\
}\
.ace-darkGreen .ace_entity.ace_other.ace_attribute-name {\
color:#FFFF89;\
}\
.ace-darkGreen .ace_markup.ace_underline {\
text-decoration: underline;\
}\
.ace-darkGreen .ace_fold-widget {\
text-align: center;\
}\
.ace-darkGreen .ace_fold-widget:hover {\
color: #777;\
}\
.ace-darkGreen .ace_fold-widget.ace_start,\
.ace-darkGreen .ace_fold-widget.ace_end,\
.ace-darkGreen .ace_fold-widget.ace_closed{\
background: none;\
border: none;\
box-shadow: none;\
}\
.ace-darkGreen .ace_fold-widget.ace_start:after {\
content: '▾'\
}\
.ace-darkGreen .ace_fold-widget.ace_end:after {\
content: '▴'\
}\
.ace-darkGreen .ace_fold-widget.ace_closed:after {\
content: '‣'\
}\
.ace-darkGreen .ace_indent-guide {\
border-right:1px dotted #333;\
margin-right:-1px;\
}\
.ace-darkGreen .ace_fold { \
background: #222; \
border-radius: 3px; \
color: #7AF; \
border: none; \
}\
.ace-darkGreen .ace_fold:hover {\
background: #CCC; \
color: #000;\
}\
";

var dom = acequire("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);

});
