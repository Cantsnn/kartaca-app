from marshmallow import Schema, fields, validate

class CreateProductSchema(Schema):
    name = fields.String(required=True,validate=validate.Length(min=6))
    image_url = fields.String(required=True,validate=validate.URL(relative=True, require_tld=False))

    def validate(self, data):
        self.load(data)
