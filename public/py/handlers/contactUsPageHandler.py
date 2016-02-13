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

    def validate(self, body):
        isOk = True;
        # check for email:
        if not body.has_key('e'):
            isOk = False
        else:
            if not mail.is_email_valid(body['e']):
                isOk = False
        if not body.has_key('name'):
            isOk = False
        if not body.has_key('message'):
            isOk = False
        return isOk

    def post(self):
        response = { 'info': 'every thing ok', 'error':'false' }
        #uName = self.request.get('name')
        #print 'uName:'+uName
        body =  json.loads(self.request.body)
        # these are the required keys
        # 1 name, 2 e(email) 3 email(honey pot) 4 msg
        #uName = body['name']
        #uEmail = body['e'] # real email
        uHoneyPotEmail = ''
        if body.has_key('email'):
            uHoneyPotEmail = body['email'] # email by robot
        #uName = 'from server'+uName
        adminEmail='pankajche1@gmail.com'
        #message='every thing is ok. mail sent'

        if not self.validate(body):
            # prompt user to enter a valid address
            #message='mail address not valid'
            response['error'] = 'true'
            response['info'] = 'form data not valid'
        else:
            uName = body['name']
            uEmail = body['e'] # real email
            uMessage = body['message']
            sender_address = "Taptach Support<admin@tapatch.com>"
            subject = "Thanks for message"
            body='''we have received your mail from %s
            email: %s and message:%s ''' % (uName,uEmail,uMessage)
            print body
            if uHoneyPotEmail == u'':
                mail.send_mail(sender_address, adminEmail, subject, body)
                response['error'] = 'false'
                #message += '... and mail sent by admin'
            else:
                message += '... but this was a robot call'
                response['error'] = 'true'
                response['info'] = 'robot'
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(response))






