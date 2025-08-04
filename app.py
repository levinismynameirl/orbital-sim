from flask import Flask, render_template, request
from orbit_calc import calculate_orbit

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    result = None
    if request.method == 'POST':
        try:
            mass = float(request.form['mass'])
            speed = float(request.form['speed'])
            distance = float(request.form['distance'])
            planet_mass = float(request.form['planet_mass'])
            result = calculate_orbit(mass, speed, distance, planet_mass)
        except Exception as e:
            result = {'error': str(e)}
    return render_template('index.html', result=result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)