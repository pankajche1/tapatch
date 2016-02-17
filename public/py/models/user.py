'''
module for user of the site who is a memeber
'''
from google.appengine.ext import ndb

class User(ndb.Model):
    '''
    This represents the user
    :param name: name of the user give by him
    :param userId: only the email name with domail ex: pankajche1 only 
    :param nickName: it is the full email address on google ex: abc@gmail.com
    :param email: email given by the user
    :type userId:string object 

    '''
    name = ndb.StringProperty(indexed=False)
    userId = ndb.StringProperty(indexed=False)
    nickName = ndb.StringProperty(indexed=False)
    email = ndb.StringProperty(indexed=False)
    created = ndb.DateTimeProperty(indexed=False, auto_now_add=True)
    edited = ndb.DateTimeProperty(indexed=False,auto_now=True)
    # admin level
    level = ndb.StringProperty(indexed=False)
