# Products [/api/products]
## Retrieve all products [GET]
+ Request (application/json)
+ Response 200 (application/json)
    + Schema

  ```javascript
  {
      "type": "array",
      "description": "Array of Products",
      "items": {
        "type": "object",
        "description": "Product",
        "properties": {
        "_id": {
          "type": "ObjectId"
        },
        "stock": {
          "type": "integer"
        }
      }
      },
      "additionalProperties": false
  }
  ```

# Stock [/api/products/{id}/stock]
+ Parameters
  + id : (ObjectId) - Unique identifier for a product.
##  Modify product stock [PATCH]
+ Request (application/json)
  + Body
  ```javascript
    {
      "operationType": 1,
      "quantity": 25
    }
  ```
  + Schema
  ```javascript
    {
        "type": "object",
        "description": "Request Body",
        "properties": {
          "operationType": {
          "type": "integer",
          "description": "Enum type (1: SET, 2: ADD, 3: SUB)"
        },
          "quantity": {
          "type": "integer",
          "description": "Positive number"
          }
        },
        "additionalProperties": false
    }
  ```
+ Response 204 (application/json)
