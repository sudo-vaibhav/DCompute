import { ErrorMessage, Field } from 'formik'
import FeatherIcon from 'feather-icons-react'
const useLabelText = (str) => {
  // adding space between strings
  const result = str.replace(/([A-Z])/g, ' $1')

  // converting first character to uppercase and join it to the final string
  const final = result.charAt(0).toUpperCase() + result.slice(1)

  return final // "My Name"
}

const FormField = ({ fieldName, inputClassName, as, children, icon = '' }) => {
  const labelText = useLabelText(fieldName)
  const type =
    ['password', 'email'].find((e) => e === fieldName.toLowerCase()) || 'text'
  const className = `w-full pl-10 p-2 text-lg rounded-lg bg-transparent-900 text-secondary-500 border-secondary-500 border my-3 ${inputClassName}`
  return (
    <div>
      <div>
        <label className="text-light-100">{labelText}</label>
        {as === 'select' ? (
          <Field name={fieldName} as={as} required className={className}>
            {children}
          </Field>
        ) : (
          <div>
            <FeatherIcon
              icon={icon}
              size={16}
              className="absolute grid place-items-center ml-3 mt-6 text-secondary-500"
            />
            <Field
              name={fieldName}
              placeholder={fieldName}
              type={type}
              required
              className={className}
            />
          </div>
        )}
      </div>
      <div>
        <ErrorMessage name={fieldName} />
      </div>
    </div>
  )
}

export default FormField
