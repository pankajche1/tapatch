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
						'info':'Basic functionality and design is complete',
						'writer':'Pankaj',
						'started':'6 Feb 2016',
						'finished':'14 Feb 2016',
						'status':'done'


				},
			{
						'title':'Welcome Page Content Development',
						'info':'The page is being developed',
						'writer':'Sandeep Mumbai',
                        'started':'6 Feb 2016',
						'finished':'-',
						'status':'pending'
				},
                {
						'title':'Projects Page Development',
						'info':'Basic functionality and design is complete',
						'writer':'Pankaj',
						'started':'14 Feb 2016',
						'finished':'15 Feb 2016',
						'status':'done'


				}

		]}
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(obj))




