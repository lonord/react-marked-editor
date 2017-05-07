import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';

export default class ScrollHelper {
	constructor(codeMirror, dom) {
		this.editor = codeMirror;
		this.view = dom;
		this.handleEditorScroll = throttle(this.handleEditorScroll.bind(this), 20);
		this.handleViewScroll = throttle(this.handleViewScroll.bind(this), 20);
		this.recEditorScroll = debounce(this.recEditorScroll.bind(this), 200);
		this.recViewScroll = debounce(this.recViewScroll.bind(this), 200);
		this.init();
	}

	init() {
		this.editor.on('scroll', this.handleEditorScroll);
		this.view.addEventListener('scroll', this.handleViewScroll);
	}

	handleEditorScroll() {
		let { top, height, clientHeight } = this.editor.getScrollInfo();
		if (height - clientHeight <= 0) {
			return;
		}
		let per = top / (height - clientHeight);
		this.view.removeEventListener('scroll', this.handleViewScroll);
		this.view.scrollTop = (this.view.scrollHeight - this.view.clientHeight) * per;
		this.recViewScroll();
	}

	handleViewScroll() {
		let top = this.view.scrollTop;
		let height = this.view.scrollHeight;
		let clientHeight = this.view.clientHeight;
		if (height - clientHeight <= 0) {
			return;
		}
		let per = top / (height - clientHeight);
		this.editor.off('scroll', this.handleEditorScroll);
		let scrollInfo = this.editor.getScrollInfo();
		this.editor.scrollTo(null, (scrollInfo.height - scrollInfo.clientHeight) * per);
		this.recEditorScroll();
	}

	recEditorScroll () {
		this.editor.on('scroll', this.handleEditorScroll);
	}

	recViewScroll () {
		this.view.addEventListener('scroll', this.handleViewScroll);
	}

	destory() {
		this.view && this.view.removeEventListener('scroll', this.handleViewScroll);
		this.editor && this.editor.off('scroll', this.handleEditorScroll);
		this.view = null;
		this.editor = null;
	}
}