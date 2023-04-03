import os 
import redis

DB_PORT = 3306
DB_HOST = 'localhost'
DB_USER = 'root'
DB_PASS = ''
DB_NAME = ''
BASEDIR = os.path.abspath(os.path.dirname(__file__))
SQLLITE_DB_PATH = os.path.join(BASEDIR, 'database.db')

class Config(object):
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True
    SITE_NAME = 'Flask Application'
    CORS_HEADERS = 'Content-Type'
    SECRET_KEY = 'c219d4e3-3ea8-4dbb-8641-8bbfc644aa18'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + SQLLITE_DB_PATH
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SESSION_TYPE = 'redis'
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    #SESSION_REDIS = redis.from_url('redis://localhost:6379')
    SESSION_REDIS = redis.Redis("redis",port = 6379, decode_responses=True)

class ProductionConfig(Config):
    DEBUG = False


class StagingConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class TestingConfig(Config):
    TESTING = True