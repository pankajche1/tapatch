import unittest
import webapp2
import webtest
from google.appengine.api import memcache
from google.appengine.ext import ndb
from google.appengine.ext import testbed
from py.dbutils.dao import DAO as DAO
from py.dbutils.adminDao import AdminDAO as AdminDAO
from utils.dbmanager import DbManager as DbManager
from py.models.project import Project as Project
from py.models.service import Service as Service

class AdminDaoTestCase(unittest.TestCase):

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

    def testIsUserAdmin(self):
        # first create some members to the site:
        DbManager().createUsers()
        # save one more member with admin-a right:
        data = {'nickName':'pankajche1@gmail.com',
                    'userId':'pankajche1','name':'Pankaj Kumar',
                    'level':'admin-a'}
        DAO().saveUser(data)
        # now try to get users:
        members = AdminDAO().getMembers()
        self.assertEqual(11, len(members))
        # check the level:
        # get the first member:
        self.assertEqual('guest', members[0].level)
        # get the last member:
        self.assertEqual('admin-a', members[10].level)
        self.assertEqual('Pankaj Kumar', members[10].name)
        self.assertEqual('pankajche1@gmail.com', members[10].nickName)
        # now check is user admin, send the email:
        isUserAdmin = AdminDAO().isUserAdmin(members[10].nickName, 'admin-a')
        self.assertEqual(True, isUserAdmin)

    def testUpdateMemberLevel(self):
        # save two members with admin-a, admin-b rights:
        data = {'nickName':'pankajche1@gmail.com',
                    'userId':'pankajche1','name':'Pankaj Kumar',
                    'level':'admin-a'}
        DAO().saveUser(data)
        data = {'nickName':'sunny@gmail.com',
                    'userId':'sunny','name':'Sunny Dagar',
                    'level':'admin-b'}
        DAO().saveUser(data)
        # get second user:
        user = AdminDAO().getMemberByNickName('sunny@gmail.com') 
        if user != None:
            self.assertEqual('Sunny Dagar', user.name)
            self.assertEqual('admin-b', user.level)
        # change level:
        AdminDAO().updateMemberLevel('sunny@gmail.com', 'admin-a')
        # get second user:
        user = AdminDAO().getMemberByNickName('sunny@gmail.com') 
        if user != None:
            self.assertEqual('admin-a', user.level)



# [START main]
if __name__ == '__main__':
    unittest.main()
# [END main]
