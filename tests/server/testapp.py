import unittest
import webapp2
import webtest
from google.appengine.api import memcache
from google.appengine.ext import ndb
from google.appengine.ext import testbed

import tapatch
from py.handlers.mainPageHandler import MainPageHandler as MainPageHandler
from py.handlers.servicesHandler import ServicesHandler as \
                             ServicesHandler


@unittest.skip('AppTest Case')
class AppTest(unittest.TestCase):
    def setUp(self):
        # First, create an instance of the Testbed class.
        self.testbed = testbed.Testbed()
        # Then activate the testbed, which prepares the service stubs for use.
        self.testbed.activate()
        # Next, declare which service stubs you want to use.
        self.testbed.init_datastore_v3_stub()
        self.testbed.init_memcache_stub()
        self.testbed.init_user_stub()
        # Clear ndb's in-context cache between tests.
        # This prevents data from leaking between tests.
        # Alternatively, you could disable caching by
        # using ndb.get_context().set_cache_policy(False)
        ndb.get_context().clear_cache()
        # create a WSGI application:
        app = webapp2.WSGIApplication([('/',MainPageHandler),('/services',ServicesHandler)])
        # wrap the app with WebTest's AppTest:
        self.testApp=webtest.TestApp(app)

    def tearDown(self):
        self.testbed.deactivate()


    # test the handler:
    @unittest.skip('Test Main Page Handler')
    def testMainPageHandler(self):
        response=self.testApp.get('/')
        self.assertEqual(response.status_int, 200)
        #self.assertEqual(response.normal_body, 'Panku')
        #print(response.normal_body)
    def testServicesHandler(self):
        response=self.testApp.get('/services')
        self.assertEqual(response.status_int, 200)
        #print(response.normal_body)



