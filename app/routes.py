from flask import Flask, render_template
from app import app, FLASK_DEV
import os

@app.route('/', defaults={'path': ''})
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