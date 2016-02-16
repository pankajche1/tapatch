import json
from google.appengine.api import users
from py.module1 import Boy as Boy
from py.models.project import Project as Project

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


