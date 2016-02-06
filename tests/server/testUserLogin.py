import unittest
import webapp2
import webtest
from google.appengine.api import memcache
from google.appengine.ext import ndb
from google.appengine.ext import testbed
from modules.module1 import Boy as Boy
from modules.dbutils.dao import DAO as DAO
from utils.dbmanager import DbManager as DbManager
from google.appengine.api import users

class UserLoginTestCase(unittest.TestCase):
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

    def tearDown(self):
        self.testbed.deactivate()

    def loginUser(self, email='user@example.com', id='123', is_admin=False):
        self.testbed.setup_env(
            user_email=email,
            user_id=id,
            user_is_admin='1' if is_admin else '0',
            overwrite=True)

    def testLogin(self):
        assert not users.get_current_user()
        self.loginUser()
        assert users.get_current_user().email() == 'user@example.com'
        self.loginUser(is_admin=True)
        assert users.is_current_user_admin()

    def testGettingDataWithoutLogin(self):
        assert not users.get_current_user()
        # try to get data:
        # create the data
        DbManager().createBoys(20)
        boys = DAO().getBoy(None)
        #self.assertNotNone(boys)
        #print boys
        #self.assertEqual('Boy 0', boys[0].name)
        self.assertEqual(0, len(boys))

    def testGettingDataWithLogin(self):
        assert not users.get_current_user()
        # make the user login:
        self.loginUser()
        # try to get data:
        # create the data
        DbManager().createBoys(20)
        boys = DAO().getBoy(None)
        #self.assertNotNone(boys)
        #print boys
        #self.assertEqual('Boy 0', boys[0].name)
        self.assertEqual(3, len(boys))







# [START main]
if __name__ == '__main__':
    unittest.main()
# [END main]
