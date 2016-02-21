import os
import webapp2
import jinja2
from google.appengine.api import users
from py.dbutils.dao import DAO as DAO

loader = jinja2.FileSystemLoader( \
                    os.path.join(os.path.dirname(__file__),'templates'))
extensions=['jinja2.ext.autoescape']
env = jinja2.Environment(loader=loader, extensions=extensions,autoescape=True)


class MainPageHandler(webapp2.RequestHandler):

    #def __init__(self):
    #    self.adminEmail = 'pankajche1@gmail.com'
    def getUserLevel(self, nickname):
        adminEmail = 'pankajche1@gmail.com'
        print adminEmail
        if adminEmail == nickname or  nickname == 'pankajche1' :
            return 'admin-b'
        else:
            return 'member'
        
    def get(self):
        # check if the user is logged in:
        user = users.get_current_user()
        response = {'info':'','error':'false','message':'user not member'} 
        if user:
            userLink = users.create_logout_url(self.request.uri)
            userLinkText = 'logout'
            userId = user.user_id()
            userNickName = user.nickname()
            # put the user in site's database:
            user={'nickName':userNickName,'userId':userId}
            # get user level:
            userLevel = self.getUserLevel(userNickName)
            # check what type of user he is:
            response = DAO().saveUser(user)
            isUserLoggedIn = True
            #template = env.get_template('member/index.html')
            data={
                    'userInfo':response,
                    'userLink': userLink,
                    'userLinkText': userLinkText,
                    'userId': userId,
                    'userNickName' : userNickName,
                    'isUserLoggedIn' : isUserLoggedIn,
                    'services' : '' 

                    }
            if userLevel == 'admin-a':
                template = env.get_template('admin/a/index.html')
            elif userLevel == 'admin-b':
                template = env.get_template('admin/b/index.html')
            else:
                template = env.get_template('member/index.html')
        else:
            userLink = users.create_login_url(self.request.uri)
            userLinkText = 'login'
            userId = ''
            userNickName = ''
            isUserLoggedIn = False
            data={
                    'userInfo':response,
                    'userLink': userLink,
                    'userLinkText': userLinkText,
                    'userId': userId,
                    'userNickName' : userNickName,
                    'isUserLoggedIn' : isUserLoggedIn,
                    'services' : '' 

                    }

# create template
            template = env.get_template('guest/index.html')

        services = [{'heading':'Enterprise Solution',
            'sub-head':'Our Best Solutions',
            'description':'we provide best customized and cost efficient software solutions'
            },
            {'heading':'Website Development',
            'sub-head':'Business Support Solutions',
            'description':'We are experienced in developing advanced systems.'
            }
            ]
        data['services'] = services
        
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

