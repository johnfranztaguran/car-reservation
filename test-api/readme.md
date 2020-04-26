
This project includes a API server (json-server) for you to use. To install and run, use the commands below:

- `npm i`
- `npm run start:api`

Once running, you can use the API endpoints listed in the following section from `http://localhost:3001`. More information about querying the server can be found on the [json-server github page](https://github.com/typicode/json-server).

#### Endpoints & Schema

##### GET `/recipes`

```JSON
[
  Recipe {
    uuid: String
    title: String
    description: String
    images: {
      full: String
      medium: String,
      small: String
    }
    servings: Number
    prepTime: Number
    cookTime: Number
    postDate: Date
    editDate: Date
    ingredients: [
      Ingredient {
        uuid: String
        amount: Number
        measurement: String
        name: String
      }
    ]
    directions: [
      Direction {
        instructions: String
        optional: Boolean
      }
    ]
  }
]
```

##### GET `/specials`

Specials on ingredients

```json
[
  Special {
    uuid: String
    ingredientId: String
    type: String
    title: String
    geo: String (optional)
    text: String (optional)
  }
]
```
