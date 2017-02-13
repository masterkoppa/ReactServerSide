from flask import Flask


app = Flask(__name__)

app.debug = True
app.config["DEBUG"] = True

# import all files needed
from .root import *
