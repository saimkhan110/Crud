const Product = require('../models/productModel');
const { deleteFile } = require('../utils/fileHelper');

const createProduct = async (req, res, next) => {
    try {
        const { name, description, category, price, stock, isActive } = req.body;
        const product = await Product.create({
            name, description, category, price, stock, isActive,
            image: req.file ? 'uploads/' + req.file.filename : null
        });
        res.status(201).json({ success: true, message: 'Product created successfully', product });
    } catch (error) { next(error); }
};

const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json({ success: true, total: products.length, data: products });
    } catch (error) { next(error); }
};

const getProductByID = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
        res.json({ success: true, data: product });
    } catch (error) { next(error); }
};

const updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            if (req.file) deleteFile(req.file.filename);
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        const oldImage = product.image;
        for (const field of ['name', 'description', 'category', 'price', 'stock', 'isActive']) {
            if (req.body[field] !== undefined) product[field] = req.body[field];
        }
        if (req.file) product.image = 'uploads/' + req.file.filename;
        await product.save();
        // Only remove the old file after the database update succeeds.
        if (req.file) {
            req.file = null;
            deleteFile(oldImage);
        }
        res.json({ success: true, message: 'Product updated successfully', product });
    } catch (error) { next(error); }
};

const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
        deleteFile(product.image);
        res.json({ success: true, message: 'Product deleted successfully' });
    } catch (error) { next(error); }
};

module.exports = { createProduct, getAllProducts, getProductByID, updateProduct, deleteProduct };
