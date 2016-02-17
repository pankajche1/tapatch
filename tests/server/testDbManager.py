import unittest
#from modules.lib.pytz.gae import pytz
#from modules.lib.pytz.gae import timezone
import webapp2
import webtest
from google.appengine.api import memcache
from google.appengine.ext import ndb
from google.appengine.ext import testbed
from py.module1 import Boy as Boy
from py.dbutils.dao import DAO as DAO
from utils.dbmanager import DbManager as DbManager
from py.models.project import Project as Project
from py.models.service import Service as Service

#@unittest.skip('DbManagerTestCase')
class DbManagerTestCase(unittest.TestCase):
    def setUp(self):
        # First, create an instance of the Testbed class.
        self.testbed = testbed.Testbed()
        # Then activate the testbed, which prepares the service stubs for use.
        self.testbed.activate()
        # Next, declare which service stubs you want to use.
        self.testbed.init_datastore_v3_stub()
        self.testbed.init_memcache_stub()
        # Clear ndb's in-context cache between tests.
        # This prevents data from leaking between tests.
        # Alternatively, you could disable caching by
        # using ndb.get_context().set_cache_policy(False)
        ndb.get_context().clear_cache()

    def tearDown(self):
        self.testbed.deactivate()

    @unittest.skip('DbManager testCreateBoys')
    def testCreateBoys(self):
        # creates 10 boys by default:
        DbManager().createBoys()
        self.assertEqual(10, len(Boy.query().fetch(10)))

    @unittest.skip('DbManager testCreateProjects')
    def testCreateProjects(self):
        DbManager().createProjects()
        projects = Project.query().fetch(10)
        self.assertEqual(10, len(projects))
        #if  len(projects) > 0:
        #print projects[0].created
        #current=projects[0].created
        # TODO do it later for timezone:
        #user_tz = timezone('Asia/Singapore')
        #current = current.replace(tzinfo=pytz.utc).astimezone(user_tz)
        #print (current.strftime('%Y-%m-%d %H:%M:%S %z'))
        #print (current.strftime('%Y-%m-%d %H:%M:%S %Z'))
        # test websites numbers:
        websites=projects[0].websites
        self.assertEqual(0, len(websites))
        websites=projects[3].websites
        self.assertEqual(2, len(websites))
        websites=projects[5].websites
        self.assertEqual(1, len(websites))
        # test website names:
        websites=projects[3].websites
        self.assertEqual('web3', websites[0])
        self.assertEqual('web4', websites[1])
        websites=projects[5].websites
        self.assertEqual('web5', websites[0])
        # test the description:
        txt1=projects[0].description
        txt2='''
        i am writing this text for description
        '''
        self.assertEqual(txt1, txt2)

    def testCreateServices(self):
        DbManager().createCompanyServices()
        services = Service.query().fetch(10)
        self.assertEqual(10, len(services))
        # test the description:
        txt1=services[0].description
        txt2='''
        this text for description for the service.
        '''
        self.assertEqual(txt1, txt2)











# [START main]
if __name__ == '__main__':
    unittest.main()
# [END main]
