import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Form from '../Form'

global.fetch = jest.fn()

describe('Form Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders share and retrieve sections', () => {
    render(<Form />)
    expect(screen.getByText('Share Text')).toBeInTheDocument()
    expect(screen.getByText('Retrieve Text')).toBeInTheDocument()
  })

  it('handles text sharing', async () => {
    const mockShareCode = 'abc123'
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ share_code: mockShareCode }),
    })

    render(<Form />)
    
    const textarea = screen.getByLabelText(/your input/i)
    fireEvent.change(textarea, { target: { value: 'Test text' } })
    
    const shareButton = screen.getByText('Share')
    fireEvent.click(shareButton)

    await waitFor(() => {
      expect(screen.getByText('Text shared successfully!')).toBeInTheDocument()
    })
  })

  it('handles text retrieval', async () => {
    const mockText = 'Retrieved text'
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ text: mockText }),
    })

    render(<Form />)
    
    const input = screen.getByLabelText(/enter share code/i)
    fireEvent.change(input, { target: { value: 'abc123' } })
    
    const retrieveButton = screen.getByText('Retrieve')
    fireEvent.click(retrieveButton)

    await waitFor(() => {
      expect(screen.getByText(mockText)).toBeInTheDocument()
    })
  })
})
