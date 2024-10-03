import { Type } from '@sinclair/typebox';
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';
import Ajv from 'ajv';

const LoginDTOSchema = Type.Object(
    {
        email: Type.String({
            format: 'email',
            errorMessage: {
                type: 'The type of email must be a string',
                format: 'The format of email is invalid'
            }
        }),
        password: Type.String({
            errorMessage: {
                type: 'The type of password must be a string'
            }
        })
    }, 
    { 
        additionalProperties: false,
        errorMessage: {
            type: 'The object format is not valid',
        }
    }
)

const ajv = new Ajv({allErrors: true});
addFormats(ajv, ['email']).addKeyword('kind').addKeyword('modifier');
addErrors(ajv);

const validate = ajv.compile(LoginDTOSchema);

const validateLoginDTO = (req, res, next) => {
    const isDTOValit = validate(req.body);

    if(!isDTOValit) {
        res.status(400).send(ajv.errorsText(validate.errors, {separator: '\n'}));
    }

    next();
}

export default validateLoginDTO;

//Validation without library AJV and sinclair/typebox

// const DTO_PROPERTY_NAMES = ['email', 'password'];

// const LoginDTOSchema = {
//     type: 'object',
//     properties: {
//         email: { type: 'string', format: 'email' },
//         password: { type: 'string' }
//     },
//     required: ['email', 'password'],
//     addionalProperties: false
// }

// const validateLoginDTO = (req, res, next) => {
//     const loginDTO = req.body;

//     if(typeof loginDTO !== 'object') {
//         res.status(400).send('The body has to come json format');
//     }
//     const bodyPropertyNames = Object.keys(loginDTO);

//     const checkProperties = bodyPropertyNames.length === DTO_PROPERTY_NAMES.length
//         && bodyPropertyNames.every((bodyPropertyNames) => DTO_PROPERTY_NAMES.includes(bodyPropertyNames));
//     if(!checkProperties) {
//         res.status(400).send('Invalid properties, body must have unique content, email and password');
//     }
//     next();

// }

// export default validateLoginDTO;