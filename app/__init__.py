from flask import Flask
import os
import subprocess

FLASK_DEV = os.getenv('FLASK_ENV') == 'development'

app = Flask(__name__)

if not FLASK_DEV:
    subprocess.run(["npm", "run", "build", "--prefix"])
    app.static_folder = os.path.join('..', 'client', 'dist', 'static')
    app.template_folder = os.path.join('..', 'client', 'dist')

from app import routes



