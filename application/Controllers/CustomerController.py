from .ControllerBase import ControllerBase

class CustomerController(ControllerBase):

    def __init__(self):
        super(CustomerController, self).__init__()


    def get(self, id=None):
        
        if id:
            return self.get_by_id(id)
        else:
            return self.get_all()


    def get_all(self):

        try:
            age = self.request.get('age')
            name = self.request.get('name')
            gender = self.request.get('gender')
            city = self.request.get('city')
            modifier = self.request.get('modifier')

            if modifier and modifier == 'AND':
                self.modifier = 'AND'

            query = self.build_filter('age', age)
            query += self.build_filter('name', name)
            query += self.build_filter('gender', gender)
            query += self.build_filter('city', city)

            final_query = "MATCH (c:Customer) " + query + " RETURN c"
            results = self.graph.run(final_query)
            return self.jsonify(results.data())

        except Exception as e:
            return {'message': 'An error has occured at CustomerController.get_all method'}, 500


    def get_by_id(self, id):

        try:
            query = "MATCH (c:Customer) WHERE c.id = " + str(id) + " RETURN c"
            results = self.graph.run(query)
            return self.jsonify(results.data())
            
        except Exception as e:
            return {'message': 'An error has occured at CustomerController.get_by_id method'}, 500