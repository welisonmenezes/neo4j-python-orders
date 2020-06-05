from .ControllerBase import *
from .CustomerController import *
from .ProductController import *
from .OrderController import *


def start_controllers(app, api):

    ControllerBase.default_routers(app)
    
    api.add_resource(CustomerController, '/customer', '/customer/<int:id>')
    api.add_resource(ProductController, '/product', '/product/<int:id>')
    api.add_resource(OrderController, '/order', '/order/<city>')