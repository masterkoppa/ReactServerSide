from demo import app
from flask import render_template, request
import requests
from requests.exceptions import ReadTimeout, ConnectionError

@app.route('/')
def hello_word():
    component_props = {"expanded": True}
    component_html = ""

    try:
        component_html = requests.post('http://localhost:3000/', timeout=0.1, json={
                "props": component_props,
                "location": "/src/client/public/bundle.js"
            }
        ).content.decode('utf-8')
    except ReadTimeout as e:
        print("Timeout getting component")
    except ConnectionError as e:
        print("Unable to connect to server")
    except Exception as e:
        print(e)


    return render_template('index.html', component=component_html, component_props=component_props)
