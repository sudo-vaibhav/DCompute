import { Form, Formik } from 'formik'
import { useState } from 'react'
import MonacoEditor from 'react-monaco-editor'
import Card from '../../../components/Card'
import FormField from '../../../components/FormField'
import { db, useAuth } from '../../../context'
import axios from '../../../helpers/axiosForWASM'
import { useHistory } from 'react-router-dom'
const Deploy = () => {
  const history = useHistory()
  const [code, setCode] = useState(`export function run(x: i32, y: i32): i32 {
   return x + y
     }`)
  function editorDidMount(editor, monaco) {
    console.log('editorDidMount', editor)
    editor.focus()
  }
  function onChange(newValue, e) {
    setCode(newValue)
  }
  const { currentUser } = useAuth()
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
              onChange={onChange}
              editorDidMount={editorDidMount}
            />
          </div>
        </Card>
      </div>
      <div className="m-4">
        <Card className="my-4">
          <Formik
            initialValues={{
              name: 'Help me add these two very big numbers',
              description:
                'Help me find the sum of these very big numbers, I will compensate you generously in return',
              price: '20000000000',
              inputData: '10,20',
            }}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                setSubmitting(true)
                const data = {
                  ...values,
                  logs: '',
                  inputData: JSON.parse(`[${values.inputData}]`),
                  code,
                  status: 'added',
                  creator: currentUser.uid,
                  price: parseFloat(values.price),
                }
                const resp = await axios.post('/wasm', data)
                console.log(resp.fileName)

                await db.collection('job').add({
                  ...data,
                  paid: false,
                  fileName: resp.fileName,
                })

                setSubmitting(false)

                history.push('/dashboard/my-jobs')
              } catch (err) {
                console.log(err)
              }
            }}
          >
            {({ values, isSubmitting }) => (
              <Form className="py-8 px-4">
                {[
                  {
                    fieldName: 'name',
                    icon: 'file-text',
                  },
                  {
                    fieldName: 'description',
                    icon: 'edit-2',
                  },
                  {
                    fieldName: 'price',
                    icon: 'dollar-sign',
                  },
                  {
                    fieldName: 'inputData',
                    icon: 'hash',
                  },
                ].map((e) => {
                  return (
                    <FormField
                      key={e.fieldName}
                      fieldName={e.fieldName}
                      icon={e.icon}
                    />
                  )
                })}
                <div className="flex justify-end my-8">
                  <button
                    data-button="btn-primary-lg"
                    className="flex"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Submit
                    {isSubmitting && (
                      <svg
                        className="animate-spin ml-4 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </Card>
      </div>
    </div>
  )
}

export default Deploy
