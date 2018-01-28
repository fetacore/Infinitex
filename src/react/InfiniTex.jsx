import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as Colors from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './App.jsx';

const Theme = getMuiTheme({
  "appBar": {
    "color": "rgba(27, 22, 22, 0.02)",
    "titleStyle": {"color": "#000000"},
    "height": 30,
    "titleFontWeight": 400,
    "padding": 20,
   },
    "avatar": {
      "color": "#424242",
      "backgroundColor": "#ffffff"
    },
    "badge": {
        "color": "#efebe9",
        "textColor": "#000000",
        "primaryColor": "#000000",
        "primaryTextColor": "#ffffff",
        "secondaryColor": "#9e9e9e",
        "secondaryTextColor": "#000000"
    },
    "bottomNavigation": {
        "backgroundColor": "#141414",
        "unselectedColor": "#777777",
        "selectedColor": "#828282",
        "height": 55,
        "unselectedFontSize": 10,
        "selectedFontSize": 15,
        "border": 1,
        "borderColor": '#000',
    },
    "button": {
        "height": 30,
        "minWidth": 30,
        "iconButtonSize": 50
    },
    "card": {
        "titleColor": "#ffffff",
        "subtitleColor": "#757575"
    },
    "cardMedia": {
        "color": "#000000",
        "overlayContentBackground": "rgba(0, 0, 0, 0.54)",
        "titleColor": "#ffffff",
        "subtitleColor": "rgba(0, 0, 0, 0.17)"
    },
    "checkbox": {
        "boxColor": "#616161",
        "checkedColor": "#ffffff",
        "requiredColor": "#d50000",
        "disabledColor": "#000000",
        "labelColor": "#ffffff",
        "labelDisabledColor": "#000000"
    },
    "chip": {
        "backgroundColor": "#000000",
        "deleteIconColor": "rgba(255, 255, 255, 0.54)",
        "textColor": "rgba(255, 255, 255, 0.54)"
    },
    "circularProgress": {
      "color": "#000000",
      "mode": "indeterminate",
    },
    "dialog": {
        "backgroundColor": "#ffffff"
    },
    "dropDownMenu": {
        "accentColor": "#000000"
    },
    "enhancedButton": {
        "tapHighlightColor": "#ffffff"
    },
    "flatButton": {
        "buttonFilterColor": "#000000",
        "disabledTextColor": "rgba(0, 0, 0, 0.26)",
        "primaryTextColor": "rgba(255, 255, 255, 0.54)",
        "secondaryTextColor": "rgba(0, 0, 0, 0.87)"
    },
    "floatingActionButton": {
        "color": "rgba(255, 255, 255, 0.9)",
        "iconColor": "#000000",
        "secondaryColor": "#000000",
        "secondaryIconColor": "#ffffff",
        "disabledTextColor": "rgba(255, 255, 255, 0.25)",
        "disabledColor": "rgba(0, 0, 0, 0.26)"
    },
    "gridTile": {
        "textColor": "#ffffff"
    },
    "icon": {
        "backgroundColor": "#000000"
    },
    "inkBar": {
        "backgroundColor": "rgba(0, 0, 0, 0.26)"
    },
    "drawer": {
        "color": "rgba(0, 0, 0, 0.87)",
        "width": 290
    },
    "listItem": {
        "leftIconColor": "#616161",
        "rightIconColor": "#212121",
        "secondaryTextColor": "#ffffff"
    },
    "menuItem": {
        "selectedTextColor": "#000000"
    },
    "menuSubheader": {
        "textColor": "#ffffff"
    },
    "overlay": {
        "backgroundColor": "rgba(0, 0, 0, 0.87)"
    },
    "radioButton": {
        "backgroundColor": "#ffffff",
        "checkedColor": "#ffffff",
        "requiredColor": "#d50000",
        "labelColor": "#ffffff"
    },
    "raisedButton": {
        "color": "#000000",
        "primaryColor": "rgba(0, 0, 0, 0.87)",
        "primaryTextColor": "#ffffff",
        "secondaryColor": "rgba(0, 0, 0, 0.54)",
        "secondaryTextColor": "#ffffff",
        "disabledColor": "rgba(0, 0, 0, 0.26)"
    },
    "refreshIndicator": {
        "strokeColor": "#000000",
        "loadingStrokeColor": "#ffffff"
    },
    "slider": {
        "trackSize": 5,
        "trackColor": "#000000",
        "trackColorSelected": "#000000",
        "selectionColor": "#ffffff",
        "rippleColor": "#000000"
    },
    "snackbar": {
        "textColor": "#000000",
        "actionColor": "rgba(0, 0, 0, 0.54)"
    },
    "subheader": {
        "color": "#000000"
    },
    "stepper": {
        "backgroundColor": "#000000",
        "hoverBackgroundColor": "rgba(0, 0, 0, 0.45)",
        "iconColor": "rgba(0, 0, 0, 0.26)",
        "inactiveIconColor": "#424242",
        "textColor": "#ffffff"
    },
    "table": {
        "backgroundColor": "rgba(0, 0, 0, 0.54)"
    },
    "tableFooter": {
        "textColor": "#ffffff"
    },
    "tableHeaderColumn": {
        "textColor": "#fafafa"
    },
    "tableRow": {
        "hoverColor": "#000000",
        "stripeColor": "#000000",
        "selectedColor": "rgba(0, 0, 0, 0.87)",
        "textColor": "#ffffff",
        "borderColor": "#000000"
    },
    "tabs": {
        "backgroundColor": "#000000",
        "textColor": "#616161",
        "selectedTextColor": "#ffffff"
    },
    "textField": {
        "hintColor": "#0A0A0A",
        "floatingLabelColor": "#807e7e",
        "errorColor": "#d50000",
        "focusColor": "#000000",
        "textColor": "#ffffff",
        "disabledTextColor": "rgba(0, 0, 0, 0.54)",
        "borderColor": "#807e7e",
        "backgroundColor": "transparent"
    },
    "timePicker": {
        "accentColor": "#000000",
        "headerColor": "rgba(255, 255, 255, 0.41)",
        "selectColor": "rgba(0, 0, 0, 0.26)",
        "selectTextColor": "#000000"
    },
    "toggle": {
        "thumbOnColor": "#ffffff",
        "thumbOffColor": "#000000",
        "thumbRequiredColor": "#d50000",
        "trackOnColor": "rgba(255, 255, 255, 0.54)",
        "trackOffColor": "rgba(0, 0, 0, 0.75)",
        "trackRequiredColor": "rgba(213, 0, 0, 0.5)",
        "trackDisabledColor": "#424242"
    },
    "toolbar": {
        "color": "#000000",
        "backgroundColor": "#807e7e",
        "hoverColor": "rgba(255, 255, 255, 0)"
    },
    "palette": {
        "canvasColor": "#444444"
    }
});

export default class InfiniTex extends React.Component {
  render() {
    return(
      <MuiThemeProvider muiTheme={Theme}>
        <App />
      </MuiThemeProvider>
    )
  }
}
