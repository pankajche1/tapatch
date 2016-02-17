from google.appengine.ext import ndb
'''
this is the class that represents the services offered
by the company.

'''
class Service(ndb.Model):
    name = ndb.StringProperty(indexed=False)
    #url = ndb.StringProperty(indexed=False)
    dateStart = ndb.DateTimeProperty(indexed=False)
    created = ndb.DateTimeProperty(indexed=False, auto_now_add=True)
    edited = ndb.DateTimeProperty(indexed=False,auto_now=True)
    #websites =ndb.StringProperty(repeated=True)
    description = ndb.TextProperty()
    image = ndb.TextProperty()


