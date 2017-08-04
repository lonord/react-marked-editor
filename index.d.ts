/// <reference types="react" />
import React from 'react'

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
		onClick?(codeMirror: any, event: any)
	}>
	style?: any
	className?: string
}

export default class ReactMarkedEditor extends React.Component<ReactMarkedEditorProps, any> {
}

export interface ReactMarkedViewProps {
	markdown?: string
	markdownClass?: string
	markedOptions: any
	style?: any
	className?: string
}

export class ReactMarkedView extends React.Component<ReactMarkedViewProps, any> {
}