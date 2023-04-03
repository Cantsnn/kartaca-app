from marshmallow import Schema, fields, validate

class GetAllSchema(Schema):
    access_token = fields.String(required=True)

    def validate(self, data):
        self.load(data)