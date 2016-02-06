import os
import webapp2
import jinja2
from google.appengine.api import users

loader = jinja2.FileSystemLoader( \
                    os.path.join(os.path.dirname(__file__),'templates'))
extensions=['jinja2.ext.autoescape']
env = jinja2.Environment(loader=loader, extensions=extensions,autoescape=True)


class MainPageHandler(webapp2.RequestHandler):

    def get(self):
        # check if the user is logged in:
        user = users.get_current_user()
        if user:
            userLink = users.create_logout_url(self.request.uri)
            userLinkText = 'logout'
            userId = user.user_id()
            userNickName = user.nickname()
            isUserLoggedIn = True
        else:
            userLink = users.create_login_url(self.request.uri)
            userLinkText = 'login'
            userId = ''
            userNickName = ''
            isUserLoggedIn = False
        data={
            'userLink': userLink,
            'userLinkText': userLinkText,
            'userId': userId,
            'userNickName' : userNickName,
            'isUserLoggedIn' : isUserLoggedIn

        }

        template = env.get_template('module1/main-page.html')
        #template = env.get_template('module1/browserify-page.html')
        self.response.write(template.render(data))


        '''
        #template = JINJA_ENVIRONMENT.get_template('index-2.html')
        #print 'template is',template
        createDb()
        q = School.query()
        #schools = q.fetch(10)
        schools, nextCursor, more = q.fetch_page(3)
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
        '''

