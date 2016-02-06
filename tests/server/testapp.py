import unittest
import webapp2
import webtest
import tapatch
from modules.handlers.handler1 import Handler1 as Handler1
@unittest.skip('skipping')
class AppTest(unittest.TestCase):
    def setUp(self):
        # create a WSGI application:
        app = webapp2.WSGIApplication([('/',Handler1)])
        # wrap the app with WebTest's AppTest:
        self.testApp=webtest.TestApp(app)

    # test the handler:
    def testHendler1(self):
        response=self.testApp.get('/')
        self.assertEqual(response.status_int, 200)
        #self.assertEqual(response.normal_body, 'Panku')
        #print(response.normal_body)


