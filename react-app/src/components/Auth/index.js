import { Form, Formik } from 'formik'
import { Link } from 'react-router-dom'
import image from './image.svg'
import Card from '../Card'
import FormField from '../FormField'

const Auth = ({ title, cta, alterLink, extra = [] }) => {
  const extraFields = {}

  extra.forEach((extraField) => {
    extraFields[extraField.fieldName] = extraField.initialValue
  })

  return (
    <div
      style={{
        paddingTop: 92,
      }}
      className="bg-dark-500 h-screen"
    >
      <div className="container mx-auto grid gap-4 h-full lg:grid-cols-2 pt-8">
        <div className="flex items-start flex-col">
          <div className="lg:w-3/4">
            <h2 className="text-4xl  my-8 font-bold">
              Just one step away from computational goodness!
            </h2>
            <Card className="">
              <div
                className="w-3/4 text-6xl font-semibold p-4 pb-10 pr-20  mb-4 bg-secondary-700 -ml-8 -mt-0.25"
                style={{ borderBottomRightRadius: 50 }}
              >
                {title}
              </div>
              <Formik
                initialValues={{
                  email: 'mailvaibhavchopra@gmail.com',
                  password: '123456',
                  userName: 'Vaibhav Chopra',
                  ...extraFields,
                }}
                onSubmit={cta.handler}
              >
                {({ values }) => (
                  <Form className="bg-dark-300 my-6 ">
                    {[
                      {
                        fieldName: 'email',
                        icon: 'mail',
                      },
                      {
                        fieldName: 'password',
                        icon: 'lock',
                      },

                      ...extra,
                    ].map((e, idx) => {
                      return (
                        <FormField
                          key={idx}
                          fieldName={e.fieldName}
                          icon={e.icon}
                        />
                      )
                    })}
                    {title === 'register' ? (
                      <FormField fieldName={'userName'} icon={'user'} />
                    ) : null}

                    <div className="flex items-center my-8 justify-between">
                      <button data-button="btn-primary-lg">{cta.text}</button>
                      <Link
                        to={alterLink.link}
                        className="text-secondary-500 text-xl underline"
                      >
                        {alterLink.text}
                      </Link>
                    </div>
                  </Form>
                )}
              </Formik>
            </Card>
          </div>
        </div>
        <div className="flex items-end">
          <img src={image} className="w-full" />
        </div>
      </div>
    </div>
  )
}

export default Auth
