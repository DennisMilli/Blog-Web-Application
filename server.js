import express from "express";
import multer from "multer";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3000;
let posts = [];
let postId = 0;
const postLikes = {};

const upload = multer({
  dest: './public/images/',
  limits: {
  fileSize: 1024 * 1024 * 1 // 1MB
  },
  fileFilter(req, file, cb) {
    console.log("File received:", file.originalname);
    if (!file.originalname.match(/\.(png|jpe?g)$/)) {
      return cb(new Error('Only PNG and JPG images are allowed'));
    }
    cb(null, true);
    }
});

function nextid() {
  postId += 1;
  return "Article" + postId;
}
app.set('view engine', 'ejs');
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/blog", upload.single('image'), (req, res) => {
  const date = new Date().getDate();
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const month = months[new Date().getMonth() + 1];
  const year = new Date().getFullYear();
  const currentDate = month + " " + date + ', ' + year;
  
  let newPost = {
    id: nextid(),
    title: req.body.title,
    slug: req.body.title.replace(/\s+/g,'-').toLowerCase(),
    author: req.body.author,
    content: req.body.content.replace(/(\r\n|\r|\n)/g, '<br>'),    
    image: req.file.filename,
    date: currentDate,
    likes: 0
  }
  
  posts.push(newPost);
  console.log(posts);
  res.redirect("/blog");
});

app.post('/posts/:id/like', (req, res) => {
  const requestedId = req.params.id;
  
  if (!postLikes[requestedId]) {
    postLikes[requestedId] = 0;
  }
  postLikes[requestedId]++;
  console.log(postLikes); 
});

app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err.message);

  res.status(500).json({
    success: false,
    message: "An unexpected error occurred. Please try again.",
  });
});

app.get('/blog', (req, res) => {
  res.render('blog', { posts });
});

app.get('/', (req, res) => {
  posts.forEach(post => {
    post.likes = postLikes[post.id] || 0;
  });
  posts.sort((a, b) => b.likes - a.likes);
  res.render('index', { posts });
});

app.get("/blog/:slug", (req, res) => {
  const articleSlug = req.params.slug;
  const post = posts.find(post => post.slug === articleSlug);
  if (!post) {
    return res.status(404).send("Article not found");
  }
  console.log(post);
  res.render('article', { post });
});

app.get("/:slug", (req, res) => {
  const articleSlug = req.params.slug;
  const post = posts.find(post => post.slug === articleSlug);
  if (!post) {
    return res.status(404).send("Article not found");
  }
  console.log(post);
  res.render('article', { post });
});

app.delete("/blog/:identifier", (req, res) => {
  const {identifier} = req.params;

  let post = posts.find(p => p.id === identifier)
  if (post) {
    posts = posts.filter(p => p.id !== identifier);
    return console.log(`deletedById: $(post)`);
  }
  
  post = posts.find(p => p.slug === identifier)
  if (post) {
    posts = posts.filter(p => p.slug !== identifier);
    return console.log(`deletedBySlug: $(post)`);
  }
  res.status(404).json({error: "Not found"});
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
