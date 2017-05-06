# react-marked-editor
A markdown editor written by React

The editor is powered by [CodeMirror](http://codemirror.net), and the markdown transcoder is powered by [marked](https://github.com/chjj/marked)

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

Next, use the component in your code:

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
| style                  |  object  | set styles to root element of `ReactMarkedEditor`                  |
| className              |  string  | set `className` to root element of `ReactMarkedEditor`             |

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