import unittest
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

class DatastoreTestCase(unittest.TestCase):
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

    def testInsertEntity(self):
        Boy().put()
        self.assertEqual(1, len(Boy.query().fetch(2)))

    def testProperties(self):
        boy = Boy()
        # email test
        boy.email="pankaj@gmail.com"
        boy.level="a"
        boy.put()
        boys = Boy.query().fetch(2)
        self.assertEqual(1, len(boys))
        # test the email
        self.assertEqual('pankaj@gmail.com', boys[0].email)
        #level test
        self.assertEqual('a', boys[0].level)

    def testDAO1(self):
        DbManager().createProjects(20)
        # create the data
        DbManager().createBoys(20)
        boys = DAO().getBoy(None)
        #self.assertNotNone(boys)
        #print boys
        if len(boys) > 0:
            self.assertEqual('Boy 0', boys[0].name)
        # when user is not logged in can not take data:
        self.assertEqual(0, len(boys))
        q = Project.query()
        projects=q.fetch()
        self.assertEqual(20, len(projects))
        self.assertEqual('Project 0', projects[0].name)

    def testDAOSaveProject(self):
        data={'name':'aProject','websites':[],'description':'some description'}
        DAO().saveProject(data)
        q = Project.query()
        projects=q.fetch()
        self.assertEqual(1, len(projects))
        self.assertEqual('aProject', projects[0].name)

    def testDaoSaveService(self):
        data={'name':'web develop','description':'this service is to create web'}
        DAO().saveService(data)
        q = Service.query()
        services=q.fetch()
        self.assertEqual(1, len(services))
        self.assertEqual('web develop', services[0].name)

    def testDaoGetServices(self):
        DbManager().createCompanyServices()
        services = DAO().getServices()
        if len(services) > 0:
            self.assertEqual('Service 0', services[0].name)
        # when user is not logged in can not take data:
        self.assertEqual(10, len(services))

    def testDaoCreateUserFail(self):
        # already existing users in the db:
        DbManager().createUsers()
        # create a new user with the same email:
        user={'name':'Sunny','email':'user-email-1@gmail.com'}
        response = DAO().saveUser(user)
        # it must reject the user save attempt:
        responseExpected='User with this email already exists.'
        self.assertEqual(responseExpected, response['message'])
        # get users:
        users = DbManager().getUsers()
        self.assertEqual(10, len(users))

    def testDaoCreateUserSuccess(self):
        # already existing users in the db:
        DbManager().createUsers()
        # create a new user with the same email:
        user={'name':'Sunny','email':'sunny@gmail.com'}
        response = DAO().saveUser(user)
        # it must reject the user save attempt:
        responseExpected='New User created successfully'
        self.assertEqual(responseExpected, response['message'])
        # get users:
        users = DbManager().getUsers()
        self.assertEqual(11, len(users))
        # get the last added user:
        userTarget = users[10]
        # assert email:
        self.assertEqual('sunny@gmail.com', userTarget.email)
        self.assertEqual('Sunny', userTarget.name)










# [START main]
if __name__ == '__main__':
    unittest.main()
# [END main]
