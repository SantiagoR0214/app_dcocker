from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Habilitar CORS para todas las rutas

# from flask import Flask, request, jsonify

# app = Flask(__name__)

notes = {}

@app.route('/create', methods=['POST'])
def create_note():
    data = request.get_json()
    student_id = data.get('idEstudiante')
    note = data.get('notaEstudiante')
    if student_id in notes:
        return jsonify({'message': 'Note already exists for this student'}), 400
    notes[student_id] = note
    return jsonify({'message': 'Note created successfully'}), 201

@app.route('/note/<int:student_id>', methods=['GET'])
def get_note(student_id):
    note = notes.get(student_id)
    if note is None:
        return jsonify({'message': 'Note not found'}), 404
    return jsonify({'idEstudiante': student_id, 'notaEstudiante': note}), 200

@app.route('/update/<int:student_id>', methods=['PUT'])
def update_note(student_id):
    data = request.get_json()
    note = data.get('notaEstudiante')
    if student_id not in notes:
        return jsonify({'message': 'Note not found'}), 404
    notes[student_id] = note
    return jsonify({'message': 'Note updated successfully'}), 200

@app.route('/note/<int:student_id>', methods=['DELETE'])
def delete_note(student_id):
    if student_id not in notes:
        return jsonify({'message': 'Note not found'}), 404
    del notes[student_id]
    return jsonify({'message': 'Note deleted successfully'}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)
