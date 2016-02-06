import os
import urllib
import cgi
from google.appengine.api import users
from google.appengine.ext import ndb

import jinja2
import webapp2
import json

JINJA_ENVIRONMENT = jinja2.Environment(loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
                    extensions=['jinja2.ext.autoescape'],autoescape=True)


class AdminPage(webapp2.RequestHandler):

    def get(self):
        template_values = {
            'name': 'pankaj',
            'mobile': '222',
        }
        #self.response.out.write(json.dumps(obj))
        template = JINJA_ENVIRONMENT.get_template('../admin.html')
        #print 'template is',template
        self.response.write(template.render(template_values))



