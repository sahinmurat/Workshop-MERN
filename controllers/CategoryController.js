const Category = require('../models/Category');
const {validationResult} =require('express-validator')

exports.addController = async (req,res) =>{
   
    try {
        const {categoryName, description} = req.body;
        // field validation
        const validationErr = validationResult(req);
        if(validationErr?.errors?.length > 0){
            return res.status(400).json({errors:validationErr.array()});
        }
    
        // categor exist check
        const existCategory = await Category.findOne({categoryName:categoryName})
        if(existCategory){
            return res.status(400).json({errors:[{message: 'Category already exist'}]});
        }
        // save category
        const category = new Category({
            categoryName,
            description,
        })
        // const category = new Category(req.body) another way
        const addedCategory = await category.save({new:true}); // database e kaydedip kaydettigini geri getirir.
        // res.status(200).send('Category added')
        res.status(200).send(addedCategory);
    
    } catch (error) {
       return  res.status(500).json({errors: [{message:error.message}]})
    }
}


exports.getCategory =async (req,res)=>{
    res.send('aaa')
}
exports.updateCategory =async (req,res)=>{
    try {
        const validationErr = validationResult(req);
        if(validationErr?.errors?.length > 0){
            return res.status(400).json({errors: validationErr.array()})
        }

        const updatedCategory = await Category.findOneAndUpdate(
            {_id: req.body.id },
            {
                categoryName:req.body.categoryName,
                description:req.body.description,
                status: 'updated',
                updatedDate: Date.now()
            },
            {
                new:true,
                runValidators: true,
            }
            );
            res.status(200).json(updatedCategory)
    } catch (error) {
        return res.status(500).json({errors:[{message:error.message}]})
    }
}
exports.deleteCategory =async (req,res)=>{
    try {
        const deletedCategory =  await Category.findOneAndUpdate(
            {_id:req.params.id},
            {
            status:'deleted',
            deleteDate : Date.now(),
            },
            { 
            new:true
            }
        );
        res.status(200).json(deletedCategory);
    } catch (error) {
        return res.status(500).json({errors:[{message:error.message}]})
    }
}
exports.getCategories =async (req,res)=>{
  try {
      const categories = await Category.find({}).where('status', /[^deleted]/).select('-status');
      res.status(200).json(categories)
  } catch (error) {
    return res.status(500).json({errors:[{message:error.message}]})
  }
}

exports.destroyCategory = async (req, res) =>{
    try {
        await Category.deleteOne({_id:req.params.id});
        res.status(200).send('data is deleted')
    } catch (error) {
        return res.status(500).json({errors:[{message:error.message}]})
    }
}