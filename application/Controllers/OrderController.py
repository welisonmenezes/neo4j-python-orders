from .ControllerBase import ControllerBase

class OrderController(ControllerBase):

    def __init__(self):
        super(OrderController, self).__init__()


    def get(self, city=None):
        
        if city:
            return self.get_by_city(city)
        else:
            return self.get_all()


    def get_all(self):

        try:
            
            query = "MATCH (c:Customer)-[r:BUY]->(p:Product) RETURN c, r, p"
            results = self.graph.run(query)
            return self.jsonify(results.data())

        except Exception as e:
            return {'message': 'An error has occured at OrderController.get_all method'}, 500



    def get_by_city(self, city):

        try:
            
            query = "MATCH (p:Product)<-[r:BUY]-(c:Customer {city: '" + city + "'}) RETURN c, r, p"
            results = self.graph.run(query)
            return self.jsonify(results.data())

        except Exception as e:
            return {'message': 'An error has occured at OrderController.get_all method'}, 500