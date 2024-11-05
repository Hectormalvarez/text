import { render, screen, fireEvent } from '@testing-library/react'
import UserTextInput from '../UserTextInput'

describe('UserTextInput Component', () => {
  const mockOnChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders textarea with correct props', () => {
    render(
      <UserTextInput value="Test text" onChange={mockOnChange} isShared={false} />
    )
    
    const textarea = screen.getByLabelText(/your input/i)
    expect(textarea).toBeInTheDocument()
    expect(textarea).toHaveValue('Test text')
    expect(textarea).not.toBeDisabled()
  })

  it('disables textarea when isShared is true', () => {
    render(
      <UserTextInput value="Test text" onChange={mockOnChange} isShared={true} />
    )
    
    const textarea = screen.getByLabelText(/your input/i)
    expect(textarea).toBeDisabled()
  })

  it('calls onChange when text is entered', () => {
    render(
      <UserTextInput value="" onChange={mockOnChange} isShared={false} />
    )
    
    const textarea = screen.getByLabelText(/your input/i)
    fireEvent.change(textarea, { target: { value: 'New text' } })
    
    expect(mockOnChange).toHaveBeenCalled()
  })
})
