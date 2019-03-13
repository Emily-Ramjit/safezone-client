from flask import Flask, render_template, request
from app import app, FLASK_DEV
import os

# TRAIN_LINE 
# Possible values:
# ----

# CRIME_NAME
# Possible values:
# ----

# timeSpan
# Possible Values:
# 'YEAR' - Year To Date
# 'MONT' - Last 28 Days
# 'WEEK' - Week To Date

@app.route('/nearby_stations', methods=['GET'])
def nearby_stations():
    lat = request.args.get('latitude')
    lon = request.args.get('longitude')
    station_filter = request.args.get('filter')
    # Expects 
    # {
    #   latitude:   FLOAT
    #   longitude:  FLOAT
    #   filter:     ARRAY [TRAIN LINE]  Possible Values Listed Above
    # }
    return '''
        <h1>TESTING nearby_stations</h1>
        <p>Received Latitude: {}, Longitude: {}, Filter: {}</p>
        '''.format(lat, lon, station_filter)

@app.route('/nearby_crimes', methods=['GET'])
def nearby_crimes():
    lat = request.args.get('latitude')
    lon = request.args.get('longitude')
    crime_filter = request.args.get('filter')
    time_range = request.args.get('timeSpan')
    # Expects
    # {
    #   latitude:  FLOAT
    #   longitude: FLOAT
    #   filter:    ARRAY [CRIME_NAME]  Possible Values Listed Above
    #   timeSpan:  STRING              Possible Values Listed Above
    # }
    return '''
        <h1>TESTING nearby_crimes</h1>
        <p>Received Latitude: {}, Longitude: {}, Filter: {}, Range: {}</p>
        '''.format(lat, lon, crime_filter, time_range)

@app.route('/', defaults={'path': ''}, methods=['GET'])
@app.route('/<path:path>')
def index(path):
    if FLASK_DEV:
        return '''
            <div style="text-align:center">
                <h1>Flask Server Running in Dev Mode</h1>
                <h2>Change value of FLASK_ENV in the .flaskenv file to run in Production Mode</h2>
            </div>
        '''
    return render_template('index.html')


