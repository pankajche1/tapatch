import os
import webapp2
import jinja2
import json
from google.appengine.api import users

loader = jinja2.FileSystemLoader( \
                    os.path.join(os.path.dirname(__file__),'templates'))
extensions=['jinja2.ext.autoescape']
env = jinja2.Environment(loader=loader, extensions=extensions,autoescape=True)


class CurrentTopicsHandler(webapp2.RequestHandler):

    def get(self):
        #template = env.get_template('module1/main-page.html')
        #template = env.get_template('module1/browserify-page.html')
        #self.response.write(template.render(data))
        #self.response.write("projects")
        obj={'projects':
			[
				{
						'title':'Contact Us Page Development',
						'info':'The page is being developed',
						'writer':'Pankaj'
				},
			{
						'title':'Welcome Page Content Development',
						'info':'The page is being developed',
						'writer':'Sandeep Mumbai'
				},
			{
						'title':'Database Development',
						'info':'the design development is in process',
						'writer':'Ravi Banglore'
				}

		]}
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(obj))




