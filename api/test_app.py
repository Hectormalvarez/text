import json

def test_save_text(client):
    # Test saving new text
    response = client.post('/api/text',
                          data=json.dumps({'text': 'Hello, World!'}),
                          content_type='application/json')
    assert response.status_code == 201
    data = json.loads(response.data)
    assert 'share_code' in data
    assert len(data['share_code']) == 6

def test_get_text(client):
    # First save some text
    response = client.post('/api/text',
                          data=json.dumps({'text': 'Test text'}),
                          content_type='application/json')
    data = json.loads(response.data)
    share_code = data['share_code']

    # Then retrieve it
    response = client.get(f'/api/text/{share_code}')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['text'] == 'Test text'

def test_get_nonexistent_text(client):
    # Test getting a text that doesn't exist
    response = client.get('/api/text/nonexistent')
    assert response.status_code == 404

def test_save_text_no_content(client):
    # Test saving without text content
    response = client.post('/api/text',
                          data=json.dumps({}),
                          content_type='application/json')
    assert response.status_code == 400
