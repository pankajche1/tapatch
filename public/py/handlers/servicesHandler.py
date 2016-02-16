import os
import webapp2
import jinja2
import json
from google.appengine.api import users

loader = jinja2.FileSystemLoader( \
                    os.path.join(os.path.dirname(__file__),'templates'))
extensions=['jinja2.ext.autoescape']
env = jinja2.Environment(loader=loader, extensions=extensions,autoescape=True)


class ServicesHandler(webapp2.RequestHandler):
    def get(self):
        service1 = {'name': 'Ayuroma Centre (A Business Project)',
                    'year':'2015',
                    'description':'web based project for online display of \
                    of company product',
                    'image':'images/ayuroma-logo.png',
                    'website':'http://www.ayuromacentre.com'
                    }
        service2 = {'name': 'Ayuroma Centre (A Business Project)',
                    'year':'2015',
                    'description':'web based project for online display of \
                    of company product',
                    'image':'images/ayuroma-logo.png',
                    'website':'http://www.ayuromacentre.com'
                    }
        services = [service1, service2]
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(services))




