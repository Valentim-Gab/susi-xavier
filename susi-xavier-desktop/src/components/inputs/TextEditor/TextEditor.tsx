import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './TextEditor.scss'
import 'quill-emoji/dist/quill-emoji.css'
import * as Emoji from 'quill-emoji'
Quill.register('modules/emoji', Emoji)

interface TextEditorProps {
  value: string
  onChange: (value: string) => void
}

const myColors = [
  'black',
  'var(--primary)',
  'var(--secondary)',
  'red',
  'blue',
  'yellow',
  'green',
  'white',
]
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ align: ['right', 'center', 'justify'] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    [{ color: myColors }],
    [{ background: myColors }],
    ['emoji'],
  ],
  'emoji-toolbar': true,
  // 'emoji-textarea': true,
  'emoji-shortname': true,
}

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'color',
  'image',
  'background',
  'align',
  'emoji'
]

export default function TextEditor({ value, onChange }: TextEditorProps) {
  return (
    <div>
      <ReactQuill
        className="text-foreground-strong html-editor"
        theme="snow"
        modules={modules}
        formats={formats}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
