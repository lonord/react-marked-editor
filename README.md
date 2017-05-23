# react-marked-editor
A markdown editor written by React

[![version](https://img.shields.io/npm/v/react-marked-editor.svg?style=flat)](https://www.npmjs.com/package/react-marked-editor) [![version](https://img.shields.io/npm/dw/react-marked-editor.svg?style=flat)](https://www.npmjs.com/package/react-marked-editor)

The editor is powered by [CodeMirror](http://codemirror.net), and the markdown transcoder is powered by [marked](https://github.com/chjj/marked)

**(: The first major version 1.0.0 is released!**

## ChangeLog

#### Version 1.1.1
- improvement of compatibility

#### Version 1.1.0
- add custom button support

#### Version 1.0.0
- the first major version released

## Installation

```shell
$ npm install react-marked-editor
```

### Usage

Firstly, add `styled-jsx/babel` to `plugins` in your babel configuration:

```json
{
  "plugins": [
    "styled-jsx/babel"
  ]
}
```

Next, add font-awesome less/css files and font files to your project, and add some loaders to your webpack configuration:

```js
{
    test: /\.less$/,
    loader: 'style-loader!css-loader!less-loader'
},
{
    test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
    loader: 'file-loader?name=[name].[ext]'
}
```

Add font-awesome less/css file import to your entry code:

```js
import './path/to/font-awesome.(less|css)';
```

Finally, use the component in your code:

```js
import ReactMarkedEditor from 'react-marked-editor';
//...
render() {
  return (
    <div>
      <ReactMarkedEditor initialMarkdown={md}/>
    </div>
  );
}

// show readonly markdown view
import { ReactMarkedView } from 'react-marked-editor';
//...
render() {
  return (
    <div>
      <ReactMarkedView markdown={md}/>
    </div>
  );
}
```

### API Doc

**ReactMarkedEditor**

|          props         |   type   |                      detail                                        |
|------------------------|----------|--------------------------------------------------------------------|
| initialMarkdown        |  string  | the initial markdown string to show                                |
| onChange               | function | editor content change event, args -> (newValue)                    |
| markdownClassName      |  string  | `className` pass to `ReactMarkedView` inside `ReactMarkedEditor`   |
| markdownStyle          |  object  | styles object pass to `ReactMarkedView` inside `ReactMarkedEditor` |
| editorHeight           |  number  | height of editor (exclude toolbar)                                 |
| hideToolbar            |  boolean | do not show the toolbar                                            |
| style                  |  object  | set styles to root element of `ReactMarkedEditor`                  |
| className              |  string  | set `className` to root element of `ReactMarkedEditor`             |
| toolbarCustomButtons   |  array   | custom buttons add to toolbar, properties of child listed below ⬇︎ |
| ↳ title                |  string  | the `title` property of button element                             |
| ↳ icon                 |  string  | the class name of Font Awesome icon                                |
| ↳ onClick              | function | click callback, args -> (codeMirror, event)                        |

**ReactMarkedView**

|          props         |   type   |                      detail                                        |
|------------------------|----------|--------------------------------------------------------------------|
| markdown               |  string  | the initial markdown string to transcode                           |
| markdownClass          |  string  | the className pass to root element to override the default style   |
| markedOptions          |  object  | options pass to `marked`                                           |
| style                  |  object  | set styles to root element of `ReactMarkedView`                    |
| className              |  string  | set `className` to root element of `ReactMarkedView`               |

### Demo

Clone the repo

```bash
$ git clone https://github.com/lonord/react-marked-editor.git
```

Install dependencies

```bash
$ npm i
```

And run

```bash
$ npm start
```

## License

MIT