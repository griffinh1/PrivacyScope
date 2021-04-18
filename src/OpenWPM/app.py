import sqlite3
from flask import Flask, jsonify
from openwpmTools import processSite
from sqliteTools import getHttpRedirects, getJavascriptCookies

app = Flask(__name__)
app.config.from_pyfile('flask_config.py')

@app.route("/")
def index():
    return "Flask works."

@app.route('/site/<url>', methods=['GET'], strict_slashes=False)
def site_url(url):
    full_url = 'https://' + url
    processSite(full_url)
    f = open('temp_browser_id.txt', 'r')
    browser_id = f.read()
    results = {'http_redirects': getHttpRedirects(browser_id),
                'javasscript_cookies': getJavascriptCookies(browser_id)}
    response = jsonify(results)

    # Enable Access-Control-Allow-origin
    response.headers.add("Access-Control-Allow-Origin","*")
    return response

if __name__ == '__main__':
    app.run(host='127.0.0.1', port='5000')
