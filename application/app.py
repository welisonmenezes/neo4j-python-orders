from flask import Flask, Blueprint
from flask_restful import Api
from flask_cors import CORS
from py2neo import Graph

# Create the application
app = Flask(__name__, template_folder='Views/UI', static_folder='Views/UI/static')
app.config.from_pyfile('config.py')

# Create the API and the Blueprint
ApiBP = Blueprint('ApiBP', __name__, url_prefix='/api')
cors = CORS(ApiBP, resources={r"/api/*": {"origins": "*"}})
api = Api(ApiBP)
app.register_blueprint(ApiBP)
graph = Graph(password = "admin")

# Start the controllers
from Controllers import start_controllers
start_controllers(app, api)

# Start the view
from Views import start_view
start_view(app)

if __name__ == "__main__":
    app.run()