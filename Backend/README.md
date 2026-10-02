# Product CRUD API

Simple Express, MongoDB and Multer project using separate models, controllers, routes and middleware, like the category project.

## Run

1. Install Node.js 22+ and start MongoDB locally, or use a MongoDB Atlas connection string.
2. Run `npm install` inside this folder.
3. Copy `.env.example` to `.env` and set `MONGODB_URI`.
4. Run `npm run dev` (or `npm start`). Default URL: `http://localhost:5000`.

## Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | /api/products | Create product, optionally upload image |
| GET | /api/products | List products |
| GET | /api/products/:id | Get one product |
| PUT | /api/products/:id | Update fields, optionally replace image |
| DELETE | /api/products/:id | Delete product and its image from disk |

Product fields: `name` (required), `price` (required, minimum 0), `description`, `category` (simple text), `stock` (minimum 0), `isActive` (default true). Images use the `image` file field. Only `.png`, `.jpg`, `.jpeg` extensions and PNG/JPEG MIME types are accepted, up to 5 MB. This checks extension and MIME metadata, not the file's actual contents.

Use multipart form-data when uploading a file. JSON is also supported for requests without images. Do not manually set the Content-Type header for multipart requests; Your HTTP client sets the boundary automatically.

Example JSON:

```json
{ "name": "Laptop", "price": 120000, "description": "Student laptop", "category": "Electronics", "stock": 5 }
```

Image paths such as `uploads/example.jpg` are available at `http://localhost:5000/uploads/example.jpg` through `express.static()`.

## Tests

`npm test` runs HTTP tests with the actual Express routes and Multer disk uploads. A small in-memory model stub replaces MongoDB in these tests; use a connected MongoDB for database integration verification.

`.env`, installed dependencies and uploaded images are excluded from Git. Never commit MongoDB passwords.

