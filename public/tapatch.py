import os
import urllib
import cgi
from google.appengine.api import users
from google.appengine.ext import ndb
from google.appengine.datastore.datastore_query import Cursor
import jinja2
import webapp2
import json
from py.module1 import Boy as Boy
from py.handlers.mainPageHandler import MainPageHandler as MainPageHandler
from py.handlers.handler1 import Handler1 as Handler1
from py.handlers.projectsPageHandler import ProjectsPageHandler as \
                             ProjectsPageHandler
from py.handlers.contactUsPageHandler import ContactUsPageHandler as \
                             ContactUsPageHandler

#from modules.module1 import DAO as DAO
import cgi
import urllib

JINJA_ENVIRONMENT = jinja2.Environment( \
                   loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
                    extensions=['jinja2.ext.autoescape'],autoescape=True)
MAIN_PAGE_HTML='''\
<html>
    <head>
        <title>%s</title>
        <style>
            .school-info{
                border:1px solid #555;
                margin:5px;
            }

        </style>
    <head>
    <body>
        <div>%s</div>
    </body>
</html>
'''
def createDb():
    qSchools = School.query()
    schools = qSchools.fetch(2)
    if len(schools) == 0:
        for i in range(0,50):
            school = School()
            school.name='School '+str(i)
            school.put()
    qBoys = Boy.query()
    boys = qBoys.fetch(2)
    if len(boys) == 0:
        for i in range(0,50):
            boy = Boy()
            boy.name='Boy '+str(i)
            boy.put()



class Author(ndb.Model):
    """Sub model for representing an author."""
    identity = ndb.StringProperty(indexed=False)
    email = ndb.StringProperty(indexed=False)
    content = ndb.StringProperty(indexed=False)
'''
class Boy(ndb.Model):
    name = ndb.StringProperty(indexed=False)
'''
class School(ndb.Model):
    """Sub model for representing an author."""
    name = ndb.StringProperty(indexed=False)


# index page class:
# product page class:
class ProductsPage(webapp2.RequestHandler):

    def get(self):
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(DAO().getBoyJson()))
        #self.response.write('<html><body>Products Page You wrote:<pre>')
        #self.response.write(cgi.escape(self.request.get('content')))
        #self.response.write('</pre></body></html>')

class BoyPage(webapp2.RequestHandler):
    def get(self):
        schools_query = School.query()
        schools = schools_query.fetch(10)
        schoolTarget = None
        for school in schools:
            if school.name == 'H N School':
                schoolTarget = school
        template = JINJA_ENVIRONMENT.get_template('index-2.html')
        templateValues = {
            'schoolKey': schoolTarget.key.urlsafe()
        }

        #print 'template is',template
        self.response.write(template.render(templateValues))



    def post(self):
        boyName=cgi.escape(self.request.get('boyName'));
        schoolKey=cgi.escape(self.request.get('schoolKey'));
        myKey=ndb.Key('SunnyKey','myKeySunny');
        schoolKey=ndb.Key(urlsafe=schoolKey);
        schools_query = School.query()
        schools = schools_query.fetch(10)
        schoolTarget = None
        for school in schools:
            if school.name == 'H N School':
                schoolTarget = school

        boy = Boy(parent=schoolKey)
        boy.name=boyName
        boy.put()
        template = JINJA_ENVIRONMENT.get_template('index-2.html')
        templateValues = {
            'schoolKey': schoolTarget.key.urlsafe()
        }

        #print 'template is',template
        self.response.write(template.render(templateValues))

class SchoolPage(webapp2.RequestHandler):
    def get(self):
        q = School.query()
        #schools = q.fetch(10)
        curs = Cursor(urlsafe=self.request.get('cursor'))
        schools, nextCursor, more = q.fetch_page(3, start_cursor=curs)
        strSchools = '<div>'
        for school in schools:
            strSchools += '<div class="school-info">'
            strSchools += '<form action="/school" method="post">'
            strSchools += '<div>'+school.name+'</div>'
            strSchools += '<input name="schoolKey" value="' \
                         +school.key.urlsafe()+'"></input>'
            strSchools += '<div><input type="submit" \
                              value="Show School"></div>'
            strSchools += '</form>'
            strSchools += '</div>'
        if nextCursor and more:
            strSchools += '<div><a href="/school?cursor=' \
                              +nextCursor.urlsafe()+'">More...</a></div>'
        strSchools += '</div>'
        self.response.out.write(MAIN_PAGE_HTML % ('Main Page', strSchools))

    def post(self):
        #schoolName=cgi.escape(self.request.get('schoolName'));
        schoolKey=cgi.escape(self.request.get('schoolKey'));
        schoolKey=ndb.Key(urlsafe=schoolKey)
        q=School.query().filter(School._key==schoolKey)
        schools=q.fetch()
        strSchools = '<div>Test School'
        for school in schools:
            strSchools += school.name
        strSchools += '</div>'
        self.response.out.write(MAIN_PAGE_HTML % ('School Page', strSchools))





class AdminPage(webapp2.RequestHandler):

    def get(self):
        template_values = {
            'name': 'pankaj',
            'mobile': '222',
        }
        #self.response.out.write(json.dumps(obj))
        template = JINJA_ENVIRONMENT.get_template('admin.html')
        #print 'template is',template
        myKey=ndb.Key('SunnyKey','myKeySunny')
        authors_query = Author.query(ancestor=myKey)
        authors = authors_query.fetch(10)
        self.response.write('<html><head><title>Admin</title></head><body>')
        self.response.write('<h2>%s</h2>' % 'SunnyKey')
        for author in authors:
            key1=author.key
            #self.response.write('<div>%s</div>' % author.content)
            self.response.write('<div>%s, key:%s</div>' % (author.content, key1))
        myKey=ndb.Key('PankajKey','myKeyPankaj')
        authors_query = Author.query(ancestor=myKey)
        authors = authors_query.fetch(10)
        self.response.write('<h2>%s</h2>' % 'PankajKey')
        for author in authors:
            key1=author.key
            self.response.write('<div>%s, key:%s</div>' % author.content, key1)
        #sely.responsy.write(template.render(template_values))
        self.response.write('</body>')

    def post(self):
        template = JINJA_ENVIRONMENT.get_template('admin-post.html')
        content=cgi.escape(self.request.get('content'));
        template_values = {
            'name': 'pankaj',
            'mobile': '222',
            'content': content
        }
        myKey=ndb.Key('SunnyKey','myKeySunny');
        author = Author(parent=myKey)
        author.content=content
        author.put()


        self.response.write(template.render(template_values))



application = webapp2.WSGIApplication([
    ('/', MainPageHandler),
    ('/products', ProductsPage),
    ('/admin', AdminPage),
    ('/projects', ProjectsPageHandler),
    ('/school', SchoolPage),
    ('/contact-us', ContactUsPageHandler),
    ('/test1', Handler1)
    ], debug=True)

