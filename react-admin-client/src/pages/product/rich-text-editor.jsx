import React, {Component} from 'react'
import {EditorState, converToRaw, ContentState} from 'draft-js'
import PropTypes from 'prop-types'
import {Editor} from "react-draft-wysiwyg"
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

export default class RichTextEditor extends Component {
  static propTypes = {
    detail: PropTypes.string
  }

  state = {
    editorState: EditorState.createEmpty()
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    })
  }

  constructor(props) {
    super(props)
    const html = this.props.detail
    if (html) {
      const contentBlock = htmlToDraft(html)
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
      const editorState = EditorState.createWithContent(contentState)
      this.setState({
        editorState
      })
    } else {
      this.state = {
        editorState: EditorState.createEmpty()  //创建一个没有内容的编辑对象
      }
    }
  }

  getDetail = () => {
    return draftToHtml(converToRaw(this.state.editorState.getCurrentContent()))
  }

  render() {
    const {editorState} = this.state
    return (
      <Editor
        editorState={editorState}
        editorStyle={{border: '1px solid black', minHeight: 200, paddingLeft: '10px'}}
        onEditorStateChange={this.onEditorStateChange}
      />
    )
  }
}
