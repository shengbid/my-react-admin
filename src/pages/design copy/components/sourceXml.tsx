// @ts-nocheck
import React from 'react'
import { UnControlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/mode/xml/xml.js'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/idea.css'
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/foldcode.js'
import 'codemirror/addon/fold/foldgutter.js'
import 'codemirror/addon/fold/xml-fold.js'
import 'codemirror/addon/fold/indent-fold.js'
import 'codemirror/addon/fold/brace-fold'
import 'codemirror/addon/fold/markdown-fold.js'
import 'codemirror/addon/fold/comment-fold.js'
import 'codemirror/addon/selection/active-line'
import styles from './style.module.scss'
import './style2.less'

interface IpProps {
  data: any
}
const TableList: React.FC<IpProps> = (props: any) => {
  const { data } = props
  return (
    <div className={styles.sourceContaier}>
      <CodeMirror
        value={data}
        options={{
          tabSize: 4,
          mode: { name: 'xml', json: true },
          theme: 'idea',
          styleActiveLine: true,
          lineNumbers: true,
          line: true,
          foldgutter: true,
          gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
          lineWrapping: true, // 代码折叠
          foldGutter: true,
          matchBrackets: true, // 括号匹配
          autoCloseBrackets: true,
        }}
        onChange={() => {}}
      />
    </div>
  )
}

export default TableList
