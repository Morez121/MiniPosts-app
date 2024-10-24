const express = require('express');
const router = express.Router();

const Post = require('../models/Post');
const { set } = require('mongoose');



//POST is (Creats data)
router.post('/', async (req, res) => {
    //console.log(req.body);
    //res.send('Post request received');

    const postData = new Post ({
        user:req.body.user,
        title:req.body.title,
        text:req.body.text,
        hashtag:req.body.hashtag,
        location:req.body.location,
        url:req.body.url

    })

    //try to insert
    try{
        const postToSave = await postData.save()
        res.send(getPosts)
    }catch(err){
        res.send({message:err})
    }
});
// Get (Read all)
router.get('/', async(req,res)=>{
    try{
        const getPosts = await Post.find().limit(10)
        res.send(getPosts)

    }catch(err){
        res.send({message:err})
    }
    

})

//Get 2 (Read by ID)
router.get('/:postId', async(req,res)=>{
    try{
        const getPostsById = await Post.findById(req.params.postId)
        res.send(getPostsById)

    }catch(err){
        res.send({message:err})
    }
    

})

// PATCH (Update)

router.patch('/:postId', async (req, res) => {

    try {
        const updatePostById = await Post.updateOne(
            { _id: req.params.postId }, // Find the post by ID
            { 
                $set: { // Set the new values
                    user: req.body.user,
                    title: req.body.title,
                    text: req.body.text,
                    hashtag: req.body.hashtag,
                    location: req.body.location,
                    url: req.body.url
                }
            }
        );

        res.json(updatePostById); // Send the updated post back as the response

    } catch (err) {
        res.send({ message: err });
    }

});


// DELETE (delete data)


router.delete('/:postId', async (req, res) => {

    try {
        const deletePostId = await Post.deleteOne({ _id: req.params.postId }); // Find post by ID

        res.json(deletePostId); // Send the response back with the deletion info

    } catch (err) {
        res.send({ message: err }); // Send an error message if something goes wrong
    }

});




module.exports = router; 