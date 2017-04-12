module.exports = function (css, id) {
	try {
		var head = document.getElementsByTagName('head')[0];
		var styles = head.getElementsByTagName('style');
		for (var i = 0; i < styles.length; i++) {
			if (styles[i]._id == id) {
				return;
			}
		}
		var style = document.createElement("style");
		style.type = "text/css";
		style._id = id;
		try {
			style.appendChild(document.createTextNode(css));
		}
		catch (e) {
			style.styleSheet.styleText = css;
		}
		head.appendChild(style);
	}
	catch (e) { }
}