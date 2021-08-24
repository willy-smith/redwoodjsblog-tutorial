import {
  Form,
  Label,
  Submit,
  TextAreaField,
  TextField,
} from '@redwoodjs/forms/dist'
import { useForm } from 'react-hook-form'
import FormError from '@redwoodjs/forms/dist/FormError'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = () => {
  const formMethods = useForm({ mode: 'onBlur' })

  const [create, { loading, error }] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      toast.success('Thank you for your time!')
      formMethods.reset()
    },
  })

  const onSubmit = async (data) => {
    try {
      await create({ variables: { input: data } })
      console.log(data)
    } catch (error) {
      console.log(error)
    }

    create({
      variables: {
        input: data,
      },
    })
  }
  return (
    <>
      <MetaTags
        title="Contact"
        // description="Contact description"
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />
      <Toaster />
      <Form
        onSubmit={onSubmit}
        className="w-1/2 container mx-auto py-4"
        validation={{ mode: 'onBlur' }}
        formMethods={formMethods}
      >
        <FormError
          error={error}
          wrapperStyle={{ color: 'red', backgroundColor: 'lavenderblush' }}
        />
        <div>
          <Label
            className="py-2 block text-sm font-medium text-gray-700"
            htmlFor="name"
          >
            Name
          </Label>
          <TextField
            className="py-2 border focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
            name="name"
            validation={{ required: true }}
            errorClassName="error"
          />
        </div>

        <Label
          className="py-2 block text-sm font-medium text-gray-700"
          htmlFor="email"
        >
          Email
        </Label>
        <TextField
          className="block py-2 border focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
          name="email"
          validation={{
            required: true,
          }}
          errorClassName="error"
        />

        <Label
          className="block py-2 block text-sm font-medium text-gray-700"
          htmlFor="message"
        >
          Message
        </Label>
        <TextAreaField
          className="py-2 border focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
          name="message"
          validation={{ required: true }}
          errorClassName="error"
        />

        <Submit
          disabled={loading}
          className="my-4 bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded"
        >
          Send Message
        </Submit>
      </Form>
    </>
  )
}

export default ContactPage
