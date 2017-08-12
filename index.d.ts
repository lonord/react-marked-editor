/// <reference types="react" />
import React from 'react'
import CodeMirror from 'codemirror'

declare type CodeMirrorDoc = CodeMirror.Doc & CodeMirror.EditorFromTextArea

export interface ReactMarkedEditorProps {
	initialMarkdown?: string
	onChange?(editorContent: string)
	markdownClassName?: string
	markdownStyle?: any
	editorHeight?: number | string
	hideToolbar?: boolean
	toolbarCustomButtons?: Array<{
		title?: string
		text?: string
		icon?: string
		onClick?(codeMirror: CodeMirrorDoc, event: any)
	}>
	style?: any
	className?: string
	openLinkInBlank?: boolean
}

export default class ReactMarkedEditor extends React.Component<ReactMarkedEditorProps, any> {
	codeDoc: CodeMirrorDoc
	replacer: Replacer
}

export interface ReactMarkedViewProps {
	markdown?: string
	markdownClass?: string
	markedOptions: any
	style?: any
	className?: string
	openLinkInBlank?: boolean
}

export class ReactMarkedView extends React.Component<ReactMarkedViewProps, any> {
}

export class Replacer {
	constructor(codeMirror: CodeMirrorDoc)
	bold(): void
	remove(): void
	italic(): void
	codeInline(): void
	header(n?: number): void
	quote(): void
	ul(): void
	ol(): void
	separate(): void
	link(url?: string): void
	image(url?: string): void
	code(): void
	table(): void
	destory(): void
}