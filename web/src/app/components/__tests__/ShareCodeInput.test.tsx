import { render, screen, fireEvent } from '@testing-library/react'
import ShareCodeInput from '../ShareCodeInput'

describe('ShareCodeInput Component', () => {
  const mockClipboard = {
    writeText: jest.fn(),
  }
  
  beforeEach(() => {
    global.navigator.clipboard = mockClipboard
  })

  it('renders with empty share code', () => {
    render(<ShareCodeInput shareCode="" isShared={false} />)
    
    const input = screen.getByLabelText(/share code/i)
    expect(input).toBeInTheDocument()
    expect(input).toBeDisabled()
  })

  it('shows copy functionality when shared', () => {
    render(<ShareCodeInput shareCode="abc123" isShared={true} />)
    
    const input = screen.getByLabelText(/share code/i)
    expect(input).toHaveValue('abc123')
    expect(input).toHaveAttribute('title', 'Click to copy')
  })

  it('copies share code to clipboard when clicked', () => {
    render(<ShareCodeInput shareCode="abc123" isShared={true} />)
    
    const input = screen.getByLabelText(/share code/i)
    fireEvent.click(input)
    
    expect(mockClipboard.writeText).toHaveBeenCalledWith('abc123')
  })
})
