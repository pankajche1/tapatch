from google.appengine.ext import ndb
'''
this is the class that represents the signed up Users of the site.

'''
class User(ndb.Model):
    name = ndb.StringProperty(indexed=False)
    email = ndb.StringProperty(indexed=False)
    created = ndb.DateTimeProperty(indexed=False, auto_now_add=True)
    edited = ndb.DateTimeProperty(indexed=False,auto_now=True)
    # admin level
    level = ndb.StringProperty(indexed=False)
