import express from "express";
import multer from "multer";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3000;
let posts = [
  {
    id: 'Article1',
    title: 'My Journey to Full-Stack Development',
    slug: 'my-journey-to-full-stack-development',
    author: 'Dennis Akinkuotu',
    content: "Starting Point<br>I began with little to no experience in web development, working in unrelated fields. However, I was determined to break into the tech industry. My journey started with learning the basics of programming through online resources like freeCodeCamp and CS50's Introduction to Computer Science on edX.<br><br>Learning Path<br>My 11-month journey involved:<br><br>1. Learning Programming Fundamentals: I started with C++ and later moved to JavaScript, focusing on problem-solving skills through platforms like HackerRank and LeetCode.<br>2. Web Development: I dived into web development using freeCodeCamp, learning HTML, CSS, React, and Node.js. I also utilized resources like The Net Ninja tutorial for Node/Express and Brad Traversy's MERN Stack course on Udemy.<br>3. Building Projects: I created several projects, including a full-stack MERN app, to showcase my skills and build a portfolio.<br>4. Networking: I leveraged Reddit's CS-related subreddits and online communities to stay motivated and learn from others.<br><br>Key Takeaways<br><br>1. Don't be afraid to apply: Even with limited experience, apply for jobs that match your skills. Many companies are desperate for developers, and soft skills are vital in getting hired.<br>2. Build a strong portfolio: Showcase your projects on GitHub, and make sure they have a well-illustrated README file.<br>3. Stay motivated: Join online communities, and find a study buddy or cohort to stay on track.<br><br>Resources<br>Some essential resources for learning full-stack development include:<br><br>1. freeCodeCamp: A platform for learning web development from scratch.<br>2. CS50's Introduction to Computer Science: A comprehensive introduction to computer science.<br>3. Udemy: Courses like Brad Traversy's MERN Stack course.<br>4. The Net Ninja: Tutorials on Node/Express.<br>5. GitHub: Showcase your projects and build a portfolio.<br>6. Reddit: Engage with CS-related subreddits for motivation and learning.<br><br>By following a structured learning plan, building a strong portfolio, and staying motivated, you can become a full-stack developer in 11 months.<br>",
    image: 'a0438999bed3811064968a65ab161b87',
    date: 'June 24, 2025',
    likes: 0
  },
  {
    id: 'Article2',
    title: 'The Meta Blog: A Capstone Project About Blogging',
    slug: 'the-meta-blog:-a-capstone-project-about-blogging',
    author: 'Dennis Akinkuotu',
    content: `Introduction:<br><br>As I reflect on my capstone project, I'm reminded of the age-old saying, "the medium is the message." In this case, the medium is a blog, and the message is... well, also a blog! In this post, I'll take you on a journey through my capstone project, a blog about blogging.<br><br>The Concept:<br><br>My capstone project is a blog that explores the world of blogging. It's a space where I share my thoughts, experiences, and insights on what makes a great blog. From design and user experience to content creation and engagement, I'm covering it all.<br><br>The Irony:<br><br>I know what you're thinking: "A blog about blogging? That's meta!" And you're right! It is a bit meta, but that's what makes it so interesting. By creating a blog about blogging, I'm essentially holding up a mirror to the medium itself.<br><br>The Goals:<br><br>So, what do I hope to achieve with this project? For starters, I want to create a resource that's helpful to other bloggers and writers. I also want to experiment with different formats, styles, and tone to see what works best for my audience.<br><br>The Takeaways:<br><br>As I work on this project, I'm learning a lot about the art of blogging. I'm discovering what makes a great headline, how to craft compelling content, and the importance of engagement with my audience.<br><br>Conclusion:<br><br>My capstone project may seem a bit unconventional, but it's been an incredible learning experience. By creating a blog about blogging, I'm not only exploring the medium itself but also pushing myself to think creatively and critically about what makes great content.<br>`,
    image: '078e7ca843da813fd9d63231e5d1bbd4',
    date: 'June 24, 2025',
    likes: 0
  },
  {
    id: 'Article3',
    title: 'Building My First Full Stack Project (And All the Bugs I Squashed)',
    slug: 'building-my-first-full-stack-project-(and-all-the-bugs-i-squashed)',
    author: 'Dennis Akinkuotu',
    content: 'Tech is the Future of Everything in this World.<br><br>Technology has become an integral part of our daily lives, and its impact is felt across various industries and aspects of society. From healthcare to finance, education to entertainment, technology is transforming the way we live, work, and interact with each other.<br><br>One of the key drivers of this transformation is the rapid advancement of technologies such as artificial intelligence, machine learning, and the internet of things.<br><br>These technologies are enabling businesses to become more efficient, productive, and innovative, and are opening up new opportunities for growth and development.<br><br>In the healthcare sector, for example, technology is being used to develop new treatments and therapies, improve patient outcomes, and enhance the overall quality of care.<br><br>In education, technology is being used to create personalized learning experiences, improve student engagement, and increase access to educational resources.<br><br>In finance, technology is being used to develop new payment systems, improve security, and enhance the overall customer experience.<br><br>The future of technology holds even more promise, with emerging technologies such as blockchain, quantum computing, and augmented reality set to revolutionize industries and transform our lives.<br><br>As technology continues to evolve and improve, it is clear that it will play an increasingly important role in shaping the future of our world.<br><br>Whether it is through improving healthcare outcomes, enhancing educational experiences, or driving economic growth, technology is set to have a profound impact on our lives and our world.<br><br>It is therefore essential that we continue to invest in technology and harness its power to drive innovation and growth, and create a better future for all.',
    image: 'e29295779550c6672e8b3d31bb825cfb',
    date: 'June 24, 2025',
    likes: 0
  },
  {
    id: 'Article4',
    title: 'Why JavaScript Felt Like Learning a New Language',
    slug: 'why-javascript-felt-like-learning-a-new-language',
    author: 'Dennis Akinkuotu',
    content: "As a developer, I've had my fair share of experiences with various programming languages. However, when I first started learning JavaScript, I felt like I was starting from scratch – like learning a new language altogether. Here's why:<br><br>1. Syntax and Structure<br><br>JavaScript's syntax and structure were unfamiliar to me at first. Coming from a background in languages like Java or C++, I had to adjust to JavaScript's loose typing, function scope, and object-oriented programming model.<br><br>2. Dynamic Nature<br><br>JavaScript is a dynamically-typed language, which means that variable types are determined at runtime rather than compile time. This dynamic nature can be both powerful and challenging, especially for developers accustomed to statically-typed languages.<br><br>3. Asynchronous Programming<br><br>JavaScript's asynchronous programming model, based on callbacks, promises, and async/await, took some time to get used to. Understanding how to handle asynchronous operations and avoid common pitfalls like callback hell was a significant learning curve.<br><br>4. Browser-Specific Quirks<br><br>When working with JavaScript in the browser, I had to account for various browser-specific quirks and inconsistencies. This added an extra layer of complexity to my learning process.<br><br>5. Vast Ecosystem<br><br>JavaScript's ecosystem is vast and ever-evolving, with numerous libraries, frameworks, and tools to learn. From React and Angular to Vue.js and Node.js, the sheer number of options can be overwhelming.<br><br>Overcoming the Learning Curve<br><br>Despite these challenges, I was determined to master JavaScript. Here's what helped:<br><br>- Practice: The more I coded in JavaScript, the more comfortable I became with its syntax, structure, and ecosystem.<br>- Resources: I utilized online resources like MDN Web Docs, Stack Overflow, and JavaScript tutorials to deepen my understanding.<br>- Projects: Working on real-world projects helped me apply theoretical knowledge and overcome practical challenges.<br><br>Conclusion<br><br>Learning JavaScript felt like learning a new language because it required a different mindset, approach, and set of skills. However, with persistence, practice, and the right resources, I've become proficient in JavaScript and can appreciate its unique strengths and capabilities.<br><br>If you're new to JavaScript, don't be discouraged if it takes time to adjust. With dedication and practice, you'll become proficient in this versatile language and unlock a world of possibilities for web development and beyond.",
    image: 'edad308466d09ff624da04156cd442d6',
    date: 'June 24, 2025',
    likes: 0
  },
  {
    id: 'Article5',
    title: 'Lab Coat to Laptop: The Unexpected Parallels Between Medical Science and Coding',
    slug: 'lab-coat-to-laptop:-the-unexpected-parallels-between-medical-science-and-coding',
    author: 'Dennis Akinkuotu',
    content: "As a medical professional turned coder, I've discovered surprising similarities between the two fields. Here are some parallels:<br><br>1. Problem-solving: Both medicine and coding require analytical thinking to diagnose and solve complex problems.<br><br>2. Attention to detail: In medicine, small details can be life-or-death; in coding, tiny errors can crash entire systems.<br><br>3. Logical reasoning: Medical professionals and coders must both think logically to piece together symptoms or debug code.<br><br>4. Continuous learning: Medicine and coding both require ongoing education to stay current with new developments and technologies.<br><br>5. Collaboration: In medicine, teamwork is crucial for patient care; in coding, collaboration is essential for successful project development.<br><br>The transition from lab coat to laptop has been smoother than I expected, thanks to these shared skills. Both fields demand dedication, curiosity, and a passion for problem-solving.<br><br>If you're considering a similar career shift, don't be intimidated. Leverage your existing skills and experience – you might be surprised at how well they translate!",
    image: '9a3c39658e3688e6451f9a3e09f13caf',
    date: 'June 24, 2025',
    likes: 0
  }
];
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
