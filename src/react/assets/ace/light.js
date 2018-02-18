ace.define('ace/theme/light', ['require', 'exports', 'module', 'ace/lib/dom'], function (acequire, exports, module) {
  exports.isDark = true
  exports.cssClass = 'ace-light'
  exports.cssText = ".ace-light .ace_gutter {\
background: #fff;\
color: #3c3c3c;\
border-right: 1px solid #000;\
}\
.ace-light .ace_gutter-cell.ace_warning {\
background-image: none;\
background: #FC0;\
border-left: none;\
padding-left: 0;\
color: #000;\
}\
.ace-light .ace_gutter-cell.ace_error {\
background-position: -6px center;\
background-image: none;\
background: #F10;\
border-left: none;\
padding-left: 0;\
color: #000;\
}\
.ace-light .ace_print-margin {\
border-left: 1px solid #555;\
right: 0;\
background: #1D1D1D;\
}\
.ace-light {\
background-color: #fff;\
color: #000;\
}\
.ace-light .ace_cursor {\
border-left: 2px solid #000;\
}\
.ace-light .ace_cursor.ace_overwrite {\
border-left: 0px;\
border-bottom: 1px solid #FFFFFF;\
}\
.ace-light .ace_marker-layer .ace_selection {\
background-color: #cdcdcd;\
}\
.ace-light .ace_marker-layer .ace_step {\
background: rgb(198, 219, 174);\
}\
.ace-light .ace_marker-layer .ace_bracket {\
margin: -1px 0 0 -1px;\
border: 1px solid #FCE94F;\
}\
.ace-light .ace_marker-layer .ace_active-line {\
background: #f0efef;\
}\
.ace-light .ace_gutter-active-line {\
background-color: #f0efef;\
}\
.ace-light .ace_invisible {\
color: #404040;\
}\
.ace-light .ace_keyword {\
color:#00698F;\
}\
.ace-light .ace_keyword.ace_operator {\
color:#FF308F;\
}\
.ace-light .ace_constant {\
color:#1EDAFB;\
}\
.ace-light .ace_constant.ace_language {\
color:#FDC251;\
}\
.ace-light .ace_constant.ace_library {\
color:#8DFF0A;\
}\
.ace-light .ace_constant.ace_numeric {\
color:#58C554;\
}\
.ace-light .ace_invalid {\
color:#FFFFFF;\
background-color:#990000;\
}\
.ace-light .ace_invalid.ace_deprecated {\
color:#FFFFFF;\
background-color:#990000;\
}\
.ace-light .ace_support {\
color: #999;\
}\
.ace-light .ace_support.ace_function {\
color:#00AEEF;\
}\
.ace-light .ace_function {\
color:#00AEEF;\
}\
.ace-light .ace_string {\
color:#58C554;\
}\
.ace-light .ace_comment {\
color:#555;\
font-style:italic;\
padding-bottom: 0px;\
}\
.ace-light .ace_variable {\
color:#997744;\
}\
.ace-light .ace_meta.ace_tag {\
color:#BE53E6;\
}\
.ace-light .ace_entity.ace_other.ace_attribute-name {\
color:#FFFF89;\
}\
.ace-light .ace_markup.ace_underline {\
text-decoration: underline;\
}\
.ace-light .ace_fold-widget {\
text-align: center;\
}\
.ace-light .ace_fold-widget:hover {\
color: #777;\
}\
.ace-light .ace_fold-widget.ace_start,\
.ace-light .ace_fold-widget.ace_end,\
.ace-light .ace_fold-widget.ace_closed{\
background: none;\
border: none;\
box-shadow: none;\
}\
.ace-light .ace_fold-widget.ace_start:after {\
content: '▾'\
}\
.ace-light .ace_fold-widget.ace_end:after {\
content: '▴'\
}\
.ace-light .ace_fold-widget.ace_closed:after {\
content: '‣'\
}\
.ace-light .ace_indent-guide {\
border-right:1px dotted #333;\
margin-right:-1px;\
}\
.ace-light .ace_fold { \
background: #222; \
border-radius: 3px; \
color: #7AF; \
border: none; \
}\
.ace-light .ace_fold:hover {\
background: #CCC; \
color: #000;\
}\
"

  var dom = acequire('../lib/dom')
  dom.importCssString(exports.cssText, exports.cssClass)
})
