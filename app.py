from flask import Flask, request, jsonify
from orbit_calc import calculate_orbit

app = Flask(__name__)

@app.route('/calculate', methods=['POST'])
def calculate():
    try:
        data = request.get_json()
        mass = float(data['mass'])
        speed = float(data['speed'])
        distance = float(data['distance'])
        planet_mass = float(data['planet_mass'])
        result = calculate_orbit(mass, speed, distance, planet_mass)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
