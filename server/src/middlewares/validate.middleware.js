/**
 * The above function is a middleware function in JavaScript that validates the request body against a
 * schema and returns a validation error response if validation fails.
 * @param schema - The `schema` parameter in the `validate` function is likely an object that defines
 * the structure and validation rules for the request body data. It seems to have a `parse` method that
 * is used to validate and parse the `req.body` data according to the defined schema. If the validation
 * fails
 * @returns The `validate` function is returning a middleware function that takes `req`, `res`, and
 * `next` as parameters. Inside this middleware function, it tries to parse the request body using the
 * provided `schema`. If parsing is successful, it calls the `next` function to proceed to the next
 * middleware in the chain. If an error occurs during parsing, it returns a JSON response with a status
 */
export const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (err) {
    return res.status(400).json({
      message: "Validation error",
      errors: err.errors
    });
  }
};