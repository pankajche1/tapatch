import os
import webapp2
import jinja2
import json
from google.appengine.api import users
from google.appengine.api import mail

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

    def post(self):
        uName = self.request.get('name')
        #print 'uName:'+uName
        body =  json.loads(self.request.body)
        uName = body['name']
        #uName = 'from server'+uName
        emailAddress='pankajche1@gmail.com'
        message='every thing is ok. mail sent'

        if not mail.is_email_valid(emailAddress):
            # prompt user to enter a valid address
            message='mail address not valid'

        else:
            sender_address = "Taptach Support<support@tapach.com>"
            subject = "Thanks for message"
            body='''we have received your mail'''
            if uName == u'yes send my mail':
                mail.send_mail(sender_address, emailAddress, subject, body)
                message += '... and mail sent by admin'
            else:
                message += '... but mail not sent by admin'
        obj = { 'name': message, 'error':'no' }
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(obj))






