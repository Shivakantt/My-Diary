import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import _ from "lodash";
const homestartingcontent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";
const aboutcontent = "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.";
const contactcontent = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English";
const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
const posts = [];
app.get('/', (req, res) => {

    res.render("home.ejs", { content: homestartingcontent, posts: posts });

});

app.get('/About', (req, res) => {

    res.render("about.ejs", { content: aboutcontent });
});
app.get('/Contact', (req, res) => {

    res.render("contact.ejs", { content: contactcontent });
});


app.get('/compose', (req, res) => {

    res.render("compose.ejs");
});

app.post('/compose', (req, res) => {
    const post = {
        title: req.body.posttitle,
        content: req.body.postcontent
    };
    posts.push(post);
    res.redirect("/");

});

app.get('/posts/:postname',(req, res)=>{
    const storepostname = _.lowerCase(req.params.postname);
    posts.forEach (function(post)
    {
        const storedTitle = _.lowerCase(post.title);
        if (storepostname === storedTitle) {
            res.render("post.ejs",{
                title: post.title,
                content: post.content
            })
        }
    });
 });



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});