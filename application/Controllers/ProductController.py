from .ControllerBase import ControllerBase

class ProductController(ControllerBase):

    def __init__(self):
        super(ProductController, self).__init__()


    def get(self, id=None):
        
        if id:
            return self.get_by_id(id)
        else:
            return self.get_all()


    def get_all(self):

        try:
            name = self.request.get('name')

            query = self.build_filter('name', name)

            final_query = "MATCH (c:Product) " + query + " RETURN c"
            results = self.graph.run(final_query)
            return self.jsonify(results.data())

        except Exception as e:
            return {'message': 'An error has occured at ProductController.get_all method'}, 500


    def get_by_id(self, id):

        try:
            query = "MATCH (c:Product) WHERE c.id = " + str(id) + " RETURN c"
            results = self.graph.run(query)
            return self.jsonify(results.data())
            
        except Exception as e:
            return {'message': 'An error has occured at ProductController.get_by_id method'}, 500