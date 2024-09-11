import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
let blogs = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.post('/submit', (req, res) => {
  let blogName = req.body.title;
  if (blogName === "") {
    // Instead of alerting, render the page with an error message
    res.render("index.ejs", { title: blogs, error: "Enter a blog name" });
  } else {
    blogs.push(blogName);
    res.redirect('/'); // Redirect to the home page after adding a blog
  }
});

app.get('/', (req, res) => {
  res.render("index.ejs", { title: blogs, error: null });
});

// Route to render the edit form for a specific post
app.get('/edit/:id', (req, res) => {
  const blogId = req.params.id;
  res.render("edit.ejs", { id: blogId, title: blogs[blogId] });
});

// Route to handle post update submission
app.post('/edit/:id', (req, res) => {
  const blogId = req.params.id;
  blogs[blogId] = req.body.title;
  res.redirect('/');
});

// Route to handle post deletion
app.post('/delete/:id', (req, res) => {
  const blogId = req.params.id;
  blogs.splice(blogId, 1);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`listening on port ${port}`)
});
