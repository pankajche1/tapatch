import os
import webapp2
import jinja2
import json
from google.appengine.api import users

loader = jinja2.FileSystemLoader( \
                    os.path.join(os.path.dirname(__file__),'templates'))
extensions=['jinja2.ext.autoescape']
env = jinja2.Environment(loader=loader, extensions=extensions,autoescape=True)


class ContactUsPageHandler(webapp2.RequestHandler):

    def get(self):
        obj = [{ 'name': 'contact us' },

               { 'name': 'Tech Media Experimental' },
               { 'name': 'Blender Animation Project' },
               { 'name': 'Student Teaching program' },
               { 'name': 'Employee Management Program' },
               ]

        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(obj))




