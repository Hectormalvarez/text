import logging
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import random, string

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///./texts.db' 
db = SQLAlchemy(app)

# Configure logging
logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(levelname)s - %(message)s')

class Text(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    share_code = db.Column(db.String(8), unique=True, nullable=False)
    text = db.Column(db.Text, nullable=False)

with app.app_context():
    db.create_all()

@app.route('/api/text', methods=['POST'])
def save_text():
    logging.info('Received request to save text')
    data = request.get_json()
    text = data.get('text')
    if not text:
        logging.error('Text not provided in request')
        return jsonify({'error': 'Text is required'}), 400

    share_code = ''.join(random.choices(string.ascii_letters + string.digits, k=8))  

    new_text = Text(share_code=share_code, text=text)
    db.session.add(new_text)
    db.session.commit()
    logging.info(f'Text saved with share code: {share_code}')

    return jsonify({'share_code': share_code}), 201

@app.route('/api/text/<share_code>', methods=['GET'])
def get_text(share_code):
    logging.info(f'Received request to get text with share code: {share_code}')
    text = Text.query.filter_by(share_code=share_code).first()

    if not text:
        logging.warning(f'Text not found for share code: {share_code}')
        return jsonify({'error': 'Text not found'}), 404

    logging.info(f'Text retrieved for share code: {share_code}')
    return jsonify({'text': text.text}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)