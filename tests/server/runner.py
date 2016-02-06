#!/usr/bin/python
import optparse
import os
import sys
import unittest
def main(sdk_path, test_path):

    # If the sdk path points to a google cloud sdk installation
    # then we should alter it to point to the GAE platform location.
    if os.path.exists(os.path.join(sdk_path, 'platform/google_appengine')):
        sys.path.insert(0, os.path.join(sdk_path, 'platform/google_appengine'))
    else:
        sys.path.insert(0, sdk_path)
    sys.path.insert(0, '../public_html/')
    #print(sys.path)
    # Ensure that the google.appengine.* packages are available
    # in tests as well as all bundled third-party packages.
    import dev_appserver
    dev_appserver.fix_sys_path()
    # Loading appengine_config from the current project ensures that any
    # changes to configuration there are available to all tests (e.g.
    # sys.path modifications, namespaces, etc.)
    try:
        import appengine_config
        (appengine_config)
    except ImportError:
        print "Note: unable to import appengine_config."

    # Discover and run tests.
    suite = unittest.loader.TestLoader().discover(test_path)
    unittest.TextTestRunner(verbosity=2).run(suite)
s
if __name__ == '__main__':

    SDK_PATH = '/home/pankaj/Softwares/google_appengine'
    TEST_PATH = './'
    main(SDK_PATH, TEST_PATH)







