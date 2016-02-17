import json
from google.appengine.api import users
from py.module1 import Boy as Boy
from py.models.project import Project as Project
from py.models.service import Service as Service
from py.models.user import User as User

class DAO:
    def __init__(self):
        pass
    def getBoy(self, key):
        # first see if the user logged in:
        user = users.get_current_user()
        if user:
            q = Boy.query()
            #schools = q.fetch(10)
            boys, nextCursor, more = q.fetch_page(3)
            #return json.dumps(boys);
            return boys;
        else:
            return [] # return empty list
    def getProjects(self):
        q = Project.query()
        projects, nextCursor, more = q.fetch_page(20)
        return projects
    def saveProject(self, data):
        project = Project(name=data['name'],
                          websites=data['websites'],
                          description=data['description'])
        project.put()
    ''' for services offered by company '''
    def saveService(self, data):
        service = Service(name=data['name'],
                description=data['description'])
        service.put()
    def getServices(self):
        q = Service.query()
        services, nextCursor, more = q.fetch_page(20)
        return services

    def saveUser(self, data):
        response = {'info':'','error':'true','message':''} 
        user = User(nickName=data['nickName'], 
                userId=data['userId'], level='guest')
        if data.has_key('name'):
            user.name = data['name']
        q = User.query()
        users = q.fetch()
        isEmailFound=False
        # check the already existing users:
        for i in range(0, len(users)):
            if users[i].nickName== user.nickName:
                isEmailFound = True
                break
        if isEmailFound == True:
            response['error']='true'
            response['message']='User with this email already exists.'
        else:
            # create user:
            user.put()
            response['error']='false'
            response['message']='New User created successfully'
        return response




