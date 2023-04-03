from marshmallow import Schema, fields, validate

class CreateUserSchema(Schema):
    firstname = fields.String(required=True,validate=validate.Length(min=3))
    lastname = fields.String(required=True,validate=validate.Length(min=3))
    email = fields.Email(required=True)
    password = fields.String(required=True,validate=validate.Length(min=6))

    def validate(self, data):
        self.load(data)