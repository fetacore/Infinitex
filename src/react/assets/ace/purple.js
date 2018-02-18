ace.define('ace/theme/purple', ['require', 'exports', 'module', 'ace/lib/dom'], function (acequire, exports, module) {
  exports.isDark = true
  exports.cssClass = 'ace-purple'
  exports.cssText = ".ace-purple .ace_gutter {\
background: #320f27;\
color: #ede8e8;\
border-right: 1px solid #a18f8f;\
}\
.ace-purple .ace_gutter-cell.ace_warning {\
background-image: none;\
background: #FC0;\
border-left: none;\
padding-left: 0;\
color: #000;\
}\
.ace-purple .ace_gutter-cell.ace_error {\
background-position: -6px center;\
background-image: none;\
background: #F10;\
border-left: none;\
padding-left: 0;\
color: #000;\
}\
.ace-purple .ace_print-margin {\
border-left: 1px solid #555;\
right: 0;\
background: #1D1D1D;\
}\
.ace-purple {\
background-color: #300f26;\
color: #fff;\
}\
.ace-purple .ace_cursor {\
border-left: 2px solid #FFFFFF;\
}\
.ace-purple .ace_cursor.ace_overwrite {\
border-left: 0px;\
border-bottom: 1px solid #FFFFFF;\
}\
.ace-purple .ace_marker-layer .ace_selection {\
background-color: #58274f;\
}\
.ace-purple .ace_marker-layer .ace_step {\
background: rgb(198, 219, 174);\
}\
.ace-purple .ace_marker-layer .ace_bracket {\
margin: -1px 0 0 -1px;\
border: 1px solid #FCE94F;\
}\
.ace-purple .ace_marker-layer .ace_active-line {\
background: #573a54;\
}\
.ace-purple .ace_gutter-active-line {\
background-color: #573a54;\
}\
.ace-purple .ace_invisible {\
color: #404040;\
}\
.ace-purple .ace_keyword {\
color:#00698F;\
}\
.ace-purple .ace_keyword.ace_operator {\
color:#FF308F;\
}\
.ace-purple .ace_constant {\
color:#1EDAFB;\
}\
.ace-purple .ace_constant.ace_language {\
color:#FDC251;\
}\
.ace-purple .ace_constant.ace_library {\
color:#8DFF0A;\
}\
.ace-purple .ace_constant.ace_numeric {\
color:#58C554;\
}\
.ace-purple .ace_invalid {\
color:#FFFFFF;\
background-color:#990000;\
}\
.ace-purple .ace_invalid.ace_deprecated {\
color:#FFFFFF;\
background-color:#990000;\
}\
.ace-purple .ace_support {\
color: #999;\
}\
.ace-purple .ace_support.ace_function {\
color:#00AEEF;\
}\
.ace-purple .ace_function {\
color:#00AEEF;\
}\
.ace-purple .ace_string {\
color:#58C554;\
}\
.ace-purple .ace_comment {\
color:#555;\
font-style:italic;\
padding-bottom: 0px;\
}\
.ace-purple .ace_variable {\
color:#997744;\
}\
.ace-purple .ace_meta.ace_tag {\
color:#BE53E6;\
}\
.ace-purple .ace_entity.ace_other.ace_attribute-name {\
color:#FFFF89;\
}\
.ace-purple .ace_markup.ace_underline {\
text-decoration: underline;\
}\
.ace-purple .ace_fold-widget {\
text-align: center;\
}\
.ace-purple .ace_fold-widget:hover {\
color: #777;\
}\
.ace-purple .ace_fold-widget.ace_start,\
.ace-purple .ace_fold-widget.ace_end,\
.ace-purple .ace_fold-widget.ace_closed{\
background: none;\
border: none;\
box-shadow: none;\
}\
.ace-purple .ace_fold-widget.ace_start:after {\
content: '▾'\
}\
.ace-purple .ace_fold-widget.ace_end:after {\
content: '▴'\
}\
.ace-purple .ace_fold-widget.ace_closed:after {\
content: '‣'\
}\
.ace-purple .ace_indent-guide {\
border-right:1px dotted #333;\
margin-right:-1px;\
}\
.ace-purple .ace_fold { \
background: #222; \
border-radius: 3px; \
color: #7AF; \
border: none; \
}\
.ace-purple .ace_fold:hover {\
background: #CCC; \
color: #000;\
}\
"

  var dom = acequire('../lib/dom')
  dom.importCssString(exports.cssText, exports.cssClass)
})
