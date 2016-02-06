import os
import webapp2
import jinja2
from google.appengine.api import users

JINJA_ENVIRONMENT = jinja2.Environment( \
                #loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
                loader=jinja2.FileSystemLoader( \
                    os.path.join(os.path.dirname(__file__),'templates')),
                #loader=jinja2.FileSystemLoader(searchpath='../../'),
                    extensions=['jinja2.ext.autoescape'],autoescape=True)

class Handler1(webapp2.RequestHandler):
    def get(self):
        #self.response.headers['Content-Type']='text/plain'
        #self.response.write('Sunny')
        #print "pankaj Info:%s" % os.path.dirname(__file__)
        #template = JINJA_ENVIRONMENT.get_template('index-4.html')
        data={
            'title':'this is title',
            'marks':[10,12,13,14,15]

        }
        user = users.get_current_user()
        if user:
            self.response.headers['Content-Type'] = 'text/html; charset=utf-8'
            self.response.write('Hello, ' + user.nickname())
        else:
            self.redirect(users.create_login_url(self.request.uri))

        #template = JINJA_ENVIRONMENT.get_template('module1/partial1.html')
        #self.response.write(template.render(data))



