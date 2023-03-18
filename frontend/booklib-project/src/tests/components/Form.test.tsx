import Form from '../../components/Form'
import { screen, render } from '@testing-library/react'
import { addBookfields } from '../../data/data'
import userEvent from '@testing-library/user-event'
describe('Form', () => {
    // Render the component...

    describe('Add a book form', () => {
        // Prepare...
        const { getByText, getByPlaceholderText, getByRole, getByLabelText } = render(<Form fields={addBookfields} type='addBook' title='Add a book' />)

        it('should render the add book form with required fields', async () => {

            // Action...
            const heading = getByText(/Add a book/i)
            const title = getByPlaceholderText(/Enter book title/i)
            const author = getByPlaceholderText(/Enter book author/i)
            const category = getByPlaceholderText(/Select book category/i)
            const year = getByPlaceholderText(/Enter book year/i)
            const coverImageButton = getByText(/Add cover image/i)
            const addBookButton = getByRole('button', {
                name: /Add book file/i,
            })

            // Assert...
            expect(heading).toBeInTheDocument()
            expect(title).toBeInTheDocument()
            expect(author).toBeInTheDocument()
            expect(category).toBeInTheDocument()
            expect(year).toBeInTheDocument()
            expect(coverImageButton).toBeInTheDocument()
            expect(addBookButton).toBeInTheDocument()
        })

        it('should add a cover image', ()=> {
            // Action...
            const testImageFile = new File(['hello'], 'hello.png', {type: "image/png"})
            const coverImage = getByText('Add cover image')
            userEvent.upload(coverImage, testImageFile)
            // const imageDisplay = getByLabelText('Add cover image')
            // Assert...
            // expect(imageDisplay).not.toBeInTheDocument()
            // expect(imageDisplay.)
            expect(coverImage).toBeInTheDocument()
        })

        it('should validate the form')
    })
})

export { }