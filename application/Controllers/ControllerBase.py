from flask import  request, jsonify
from flask_restful import Resource, reqparse
from app import graph

class ControllerBase(Resource):

    def __init__(self):
        self.request = request.args
        self.jsonify = jsonify
        self.graph = graph
        self.modifier = 'OR'
        self.is_first = True


    def build_filter(self, label, value):

        query = ''
        the_modifier = self.modifier
        is_string = False

        type_of_value = str(type(value))
        if type_of_value == '<class \'str\'>':
            is_string = True

        try:
            int(value)
            is_string = False
        except:
            pass

        if self.modifier and self.modifier == 'AND':
            the_modifier = 'AND'

        if value:
            if not self.is_first:
                query += the_modifier + ' '
            else:
                query += 'WHERE '

            if is_string:
                query += 'c.' + label + ' = \'' + value + '\' '
            else:
                query += 'c.' + label + ' = ' + value + ' '

            self.is_first = False

        print(query)
        return query


    @staticmethod
    def default_routers(app):

        # Error 404 handler
        @app.route('/api/<path:path>', defaults={'path': ''})
        def error_404(path):
            return jsonify({
                'error': 404, 
                'message': 'The requested resource does not exist.'
            }), 404


        # Erro 405 handler
        @app.errorhandler(405)
        def error_405(error):
            return jsonify({
                'error': 405,
                'message': 'Method not allowed.'
            }), 405


        # Api root handler
        @app.route('/api/', defaults={'path': ''})
        def index(path):
            return jsonify({
                'message': 'Wellcome to Python/Neo4j api v.1.0.0.'
            }), 200


        # Erro 500 handler
        @app.errorhandler(500)
        def error_500(error):
            return jsonify({
                'error': 500,
                'message': 'An internal error has occurred.'
            }), 500