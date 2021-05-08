import { Form, Formik } from 'formik'
import { Component } from 'react'
import MonacoEditor from 'react-monaco-editor'
import Card from '../../../components/Card'
import FormField from '../../../components/FormField'

class Deploy extends Component {
  constructor(props) {
    super(props)
    this.state = {
      code: `export function run(x: i32, y: i32): i32 {
  return x + y
}
      `,
    }
  }
  editorDidMount(editor, monaco) {
    console.log('editorDidMount', editor)
    editor.focus()
  }
  onChange(newValue, e) {
    console.log('onChange', newValue, e)
  }
  render() {
    const code = this.state.code
    const options = {
      selectOnLineNumbers: true,
    }
    return (
      <div className="container mx-auto grid lg:grid-cols-2 ">
        <div className="m-4">
          <Card className="my-4">
            <div className="py-8 px-4">
              <h2 className="text-2xl my-4">Code:</h2>
              <MonacoEditor
                width="100%"
                height="60vh"
                language="typescript"
                theme="vs-dark"
                value={code}
                options={options}
                onChange={this.onChange}
                editorDidMount={this.editorDidMount}
              />
            </div>
          </Card>
        </div>
        <div className="m-4">
          {/* <div className="my-4">kjbkjb</div> */}
          <Card className="my-4">
            <Formik
              initialValues={{
                taskName: 'Finding the one billionth prime number',
                description:
                  'Help me find the one billionth prime number. I need it for my elliptic curve cyptography research paper',
                price: '2000',
              }}
            >
              {({ values }) => (
                <Form className="py-8 px-4">
                  <FormField fieldName="taskName" icon="file-text" />
                  <FormField fieldName="description" icon="edit-2" />
                  <FormField fieldName="price" icon="dollar-sign" />
                  <div className="flex justify-end my-8">
                    <button data-button="btn-primary-lg">Submit</button>
                  </div>
                </Form>
              )}
            </Formik>
          </Card>
        </div>
      </div>
    )
  }
}

export default Deploy
