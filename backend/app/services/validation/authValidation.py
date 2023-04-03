from marshmallow import Schema, fields, validate

class LoginSchema(Schema):
    email = fields.Email(required=True)
    password = fields.String(required=True,validate=validate.Length(min=6))

    def validate(self, data):
        self.load(data)


class LogoutSchema(Schema):
    access_token = fields.String(required=True)

    def validate(self, data):
        self.load(data)


class MeSchema(Schema):
    access_token = fields.String(required=True)

    def validate(self, data):
        self.load(data)