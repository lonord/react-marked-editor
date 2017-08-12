import startWith from 'lodash.startswith';
import endWith from 'lodash.endswith';


export default class SpecialRenderer {
	static originEmRenderer(str) {
		return `<em>${str}</em>`;
	}

	static originImageRenderer(href, title, text) {
		return `<img src="${href || ''}" alt="${text || ''}" title="${title || ''}">`
	}

	static em(str) {
		if (str.length < 3) {
			return SpecialRenderer.originEmRenderer(str);
		}
		let startChar = str[0];
		let endChar = str[str.length - 1];
		if (startChar === '@' && endChar === '@') {
			return `<span class="red">${str.substring(1, str.length - 1)}</span>`;
		}
		if (startChar === '#' && endChar === '#') {
			return `<span class="yellow">${str.substring(1, str.length - 1)}</span>`;
		}
		if (startChar === '$' && endChar === '$') {
			return `<span class="blue">${str.substring(1, str.length - 1)}</span>`;
		}
		if (str.length > 3) {
			if (startWith(str, '\\@') && endWith(str, '\\@')) {
				return SpecialRenderer.originEmRenderer(`@${str.substring(2, str.length - 2)}@`);
			}
			if (startWith(str, '\\#') && endWith(str, '\\#')) {
				return SpecialRenderer.originEmRenderer(`#${str.substring(2, str.length - 2)}#`);
			}
			if (startWith(str, '\\$') && endWith(str, '\\$')) {
				return SpecialRenderer.originEmRenderer(`$${str.substring(2, str.length - 2)}$`);
			}
		}
		return SpecialRenderer.originEmRenderer(str);
	}

	static image(href, title, text) {
		const reg = /@[0-9]+$/;
		const reg2 = /@[0-9]+c$/;
		if (text && reg.test(text)) {
			let size = reg.exec(text)[0].substring(1);
			return `<img src="${href || ''}" 
			alt="${text.replace(reg, '')}" 
			title="${title || ''}" 
			style="max-width: ${size}px;max-height: ${size}px;">`
		}
		if (text && reg2.test(text)) {
			let ss = reg2.exec(text)[0];
			let size = ss.substring(1, ss.length - 1);
			return `<div style="text-align:center;"><img src="${href || ''}" 
			alt="${text.replace(reg2, '')}" 
			title="${title || ''}" 
			style="max-width: ${size}px;max-height: ${size}px;"></div>`
		}
		return SpecialRenderer.originImageRenderer(href, title, text);
	}

	static link(href, title, text) {
		var out = '<a href="' + href + '" target="_blank"';
		if (title) {
			out += ' title="' + title + '"';
		}
		out += '>' + text + '</a>';
		return out;
	}
}