/* ==========================================================
   dailyscope.js — DailyScope News Blog JavaScript
   Handles:
   1. Article data store (all news items)
   2. Click-to-article navigation (index → article page)
   3. Article page population from URL params
   4. Subscribe prompts (all email inputs across both pages)
   5. Reading progress bar (article page)
   6. Sidebar "More Stories" + bottom grid population
   ========================================================== */

"use strict";

/* ----------------------------------------------------------
   1. ARTICLE DATA STORE
   Each object represents one news item on the index page.
   Keys must match the data-id on the clickable card element.
   ---------------------------------------------------------- */
const DS_ARTICLES = {
  "economy-1": {
    id:       "economy-1",
    category: "ECONOMY",
    tagClass: "",               // default red tag
    title:    "Exploring the Intricacies of Markets and the Global Economy",
    excerpt:  "From volatile commodity prices to shifting monetary policy, the global economy is navigating one of its most complex periods in recent memory. DailyScope examines the forces at play.",
    author:   "Freeman Cudi",
    date:     "April 15, 2025",
    read:     "4 min read",
    image:    "images/dailyscpeneweconomyvideo1.mp4",  // video — fallback handled
    isVideo:  true,
    topics:   ["Economy", "Markets", "Africa"]
  },
  "style-1": {
    id:       "style-1",
    category: "STYLE",
    tagClass: "tag-blue",
    title:    "A Journey Through Colour, Texture and Trends",
    excerpt:  "This season's fashion landscape is bold, eclectic, and deeply rooted in cultural identity. Our style desk reports from the runways and the streets.",
    author:   "Leslie Aria",
    date:     "April 15, 2025",
    read:     "3 min read",
    image:    "images/dailyscopenewart1.jpg",
    isVideo:  false,
    topics:   ["Style", "Culture", "Art"]
  },
  "education-1": {
    id:       "education-1",
    category: "EDUCATION",
    tagClass: "tag-green",
    title:    "Reshaping Classrooms: New Education Reforms Take Hold",
    excerpt:  "Sweeping education reforms are being rolled out across several African nations. Early data suggests improved enrollment — but teachers say support is still lacking.",
    author:   "Matilda Yorke",
    date:     "April 15, 2025",
    read:     "5 min read",
    image:    "images/dailyscopeneweducation1.jpg",
    isVideo:  false,
    topics:   ["Education", "Africa", "Politics"]
  },
  "market-1": {
    id:       "market-1",
    category: "MARKET",
    tagClass: "tag-orange",
    title:    "Local Traders Adapt to Rising Inflation as Ghana's Market Shifts",
    excerpt:  "Vendors in Accra's Makola Market are innovating to survive a punishing inflation cycle. Their resilience offers a window into the broader economic pressures reshaping West Africa.",
    author:   "Emelia Brown",
    date:     "April 15, 2025",
    read:     "4 min read",
    image:    "images/dailyscopeafricamarketnew1.jpg",
    isVideo:  false,
    topics:   ["Market", "Economy", "Ghana"]
  },
  "tech-1": {
    id:       "tech-1",
    category: "TECHNOLOGY",
    tagClass: "",
    title:    "Cybersecurity Experts Warn of Increased Threats as World Leaders Grapple with Critical Infrastructure Risks",
    excerpt:  "Increased threats are on the rise as world leaders grapple with tensions in global hotspots. From political unrest to cyber threats, governments are under pressure.",
    author:   "John Doe",
    date:     "April 15, 2025",
    read:     "3 min read",
    image:    "images/cybersecurity-news-1.avif",
    isVideo:  false,
    topics:   ["Technology", "Security", "World"]
  },
  "sport-1": {
    id:       "sport-1",
    category: "SPORT",
    tagClass: "tag-blue",
    title:    "Athlete Achieves Historic Win at World Championships, Inspiring a New Generation",
    excerpt:  "This landmark achievement reflects women's commitment as they rise to leadership across politics, science, and innovation.",
    author:   "Emelia Brown",
    date:     "April 15, 2025",
    read:     "4 min read",
    image:    "images/athelte-news-1.avif",
    isVideo:  false,
    topics:   ["Sport", "Africa", "Women"]
  },
  "science-1": {
    id:       "science-1",
    category: "SCIENCE",
    tagClass: "tag-teal",
    title:    "Chemical Currents: Breaking Discoveries in Chemistry and Materials Science",
    excerpt:  "Pioneering advances in nanotechnology are unlocking new possibilities. Chemistry breakthroughs are set to significantly improve human health.",
    author:   "Matilda Yorke",
    date:     "April 15, 2025",
    read:     "3 min read",
    image:    "images/chemical-currents-news-2.avif",
    isVideo:  false,
    topics:   ["Science", "Technology", "Health"]
  },
  "world-1": {
    id:       "world-1",
    category: "WORLD",
    tagClass: "tag-purple",
    title:    "Global Leaders Unite to Address Climate Crisis at COP26 Summit",
    excerpt:  "Leaders from around the world have gathered for urgent discussions. Growing concerns have pushed climate change to the top of the global agenda.",
    author:   "Freeman Cudi",
    date:     "April 15, 2025",
    read:     "5 min read",
    image:    "images/global-leaders-news-1.avif",
    isVideo:  false,
    topics:   ["World", "Climate", "Politics"]
  },
  "blog-culture-1": {
    id:       "blog-culture-1",
    category: "CULTURE",
    tagClass: "tag-orange",
    title:    "Ubuntu Echoes of Africa: Rooted Realms",
    excerpt:  "A deep dive into the living philosophy of Ubuntu — and how it continues to shape communities, governance, and daily life across the continent.",
    author:   "Burland Kwam",
    date:     "April 15, 2025",
    read:     "2 min read",
    image:    "images/popular-blog-1.avif",
    isVideo:  false,
    topics:   ["Culture", "Africa", "Philosophy"]
  },
  "blog-myth-1": {
    id:       "blog-myth-1",
    category: "MYTHOLOGY",
    tagClass: "tag-purple",
    title:    "Thrones of Olympus, Chronicles of Gods: Mythology Muse",
    excerpt:  "From the fury of Zeus to the cunning of Hermes — mythology isn't just ancient history. It's a living lens through which we understand power, fate, and the human condition.",
    author:   "Jones White",
    date:     "April 15, 2025",
    read:     "2 min read",
    image:    "images/istockphoto-1477217153-612x612-2222.jpg",
    isVideo:  false,
    topics:   ["Mythology", "Culture", "History"]
  },
  "blog-design-1": {
    id:       "blog-design-1",
    category: "DESIGN",
    tagClass: "tag-blue",
    title:    "The Science Behind Effective Call-to-Action Buttons",
    excerpt:  "Why do some buttons compel action while others are ignored? The answer lies at the intersection of psychology, colour theory, and interface design.",
    author:   "Parry Stephen",
    date:     "April 15, 2025",
    read:     "2 min read",
    image:    "images/popular-blogs-3.webp",
    isVideo:  false,
    topics:   ["Design", "Technology", "UX"]
  },
  "blog-health-1": {
    id:       "blog-health-1",
    category: "HEALTH",
    tagClass: "tag-green",
    title:    "When Strength Begins to Fracture Quietly",
    excerpt:  "Mental health in high-performing individuals often goes unaddressed until it becomes a crisis. We explore why, and what needs to change.",
    author:   "Yankey Justice",
    date:     "April 15, 2025",
    read:     "2 min read",
    image:    "images/popular-blog-5.2.webp",
    isVideo:  false,
    topics:   ["Health", "Wellness", "Mental Health"]
  }
};

/* ----------------------------------------------------------
   2. UTILITY: get author initials for avatar
   ---------------------------------------------------------- */
function getInitials(name) {
  return name
    .split(" ")
    .map(w => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/* ----------------------------------------------------------
   3. NAVIGATE TO ARTICLE PAGE
   Called when any article card is clicked on index.html.
   Stores the article id in sessionStorage then redirects.
   ---------------------------------------------------------- */
function goToArticle(articleId) {
  if (!DS_ARTICLES[articleId]) return;
  sessionStorage.setItem("ds_current_article", articleId);
  window.location.href = "article.html";
}

/* ----------------------------------------------------------
   4. MAKE CARDS CLICKABLE (index.html)
   Finds all elements with data-article-id and wires them up.
   ---------------------------------------------------------- */
function initArticleLinks() {
  const cards = document.querySelectorAll("[data-article-id]");
  cards.forEach(card => {
    card.style.cursor = "pointer";
    card.addEventListener("click", function (e) {
      // Don't fire if they clicked a button/link inside the card
      if (e.target.closest("a, button")) return;
      goToArticle(this.dataset.articleId);
    });
  });

  // Also wire up explicit "Read Story" / "Read Latest" anchor tags
  document.querySelectorAll("[data-article-link]").forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      goToArticle(this.dataset.articleLink);
    });
  });
}

/* ----------------------------------------------------------
   5. POPULATE ARTICLE PAGE (article.html)
   Reads sessionStorage, fills in all dynamic fields.
   ---------------------------------------------------------- */
function populateArticlePage() {
  const articleId = sessionStorage.getItem("ds_current_article");
  const article = DS_ARTICLES[articleId];

  if (!article) {
    // Nothing in storage — show a default / fallback state
    document.title = "Article — DailyScope";
    return;
  }

  document.title = article.title + " — DailyScope";

  // Hero image
  const heroImg = document.getElementById("articleHeroImg");
  if (heroImg) {
    if (article.isVideo) {
      // Replace img with a video element for video articles
      const video = document.createElement("video");
      video.src = article.image;
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.className = "article-hero-img";
      heroImg.replaceWith(video);
    } else {
      heroImg.src = article.image;
      heroImg.alt = article.title;
    }
  }

  // Tag
  const tagEl = document.getElementById("articleTag");
  if (tagEl) {
    tagEl.textContent = article.category;
    if (article.tagClass) tagEl.classList.add(article.tagClass);
  }

  // Breadcrumb category
  const bcCat = document.getElementById("articleCategoryBreadcrumb");
  if (bcCat) bcCat.textContent = article.category;

  // Title
  const titleEl = document.getElementById("articleTitle");
  if (titleEl) titleEl.textContent = article.title;

  // Meta
  const authorEl = document.getElementById("articleAuthor");
  const dateEl   = document.getElementById("articleDate");
  const readEl   = document.getElementById("articleRead");
  if (authorEl) authorEl.innerHTML = `<i class="fa-regular fa-user me-1"></i> ${article.author}`;
  if (dateEl)   dateEl.innerHTML   = `<i class="fa-regular fa-calendar me-1"></i> ${article.date}`;
  if (readEl)   readEl.innerHTML   = `<i class="fa-regular fa-clock me-1"></i> ${article.read}`;

  // Excerpt / lead
  const excerptEl = document.getElementById("articleExcerpt");
  if (excerptEl) excerptEl.textContent = article.excerpt;

  // Topic pills
  const pill1 = document.getElementById("articleTagPill1");
  const pill2 = document.getElementById("articleTagPill2");
  if (pill1 && article.topics[0]) pill1.textContent = article.topics[0];
  if (pill2 && article.topics[1]) pill2.textContent = article.topics[1];

  // Author card
  const avatarEl   = document.getElementById("authorAvatar");
  const authorName = document.getElementById("authorName");
  if (avatarEl)   avatarEl.textContent = getInitials(article.author);
  if (authorName) authorName.textContent = article.author;

  // Populate sidebar "More Stories"
  populateMoreStories(articleId);

  // Populate bottom grid
  populateMoreGrid(articleId);
}

/* ----------------------------------------------------------
   6. SIDEBAR "MORE STORIES"
   Shows 4 articles that are not the current one.
   ---------------------------------------------------------- */
function populateMoreStories(currentId) {
  const list = document.getElementById("moreStoriesList");
  if (!list) return;

  const others = Object.values(DS_ARTICLES)
    .filter(a => a.id !== currentId)
    .slice(0, 4);

  list.innerHTML = others.map(a => `
    <div class="ds-trending-item" data-article-link="${a.id}" style="cursor:pointer;">
      <span class="ds-trending-num" style="color:#e63946;">&#8250;</span>
      <div>
        <h6 class="ds-trending-title">${a.title}</h6>
        <span class="ds-trending-meta">${a.date} · ${a.author}</span>
      </div>
    </div>
  `).join("");

  // Wire up clicks
  list.querySelectorAll("[data-article-link]").forEach(el => {
    el.addEventListener("click", function () {
      goToArticle(this.dataset.articleLink);
    });
  });
}

/* ----------------------------------------------------------
   7. BOTTOM "MORE FROM DAILYSCOPE" GRID
   Shows up to 3 colourful cards from other articles.
   ---------------------------------------------------------- */
const ACCENT_COLORS = ["accent-red","accent-blue","accent-green","accent-orange","accent-purple","accent-teal"];

function populateMoreGrid(currentId) {
  const grid = document.getElementById("moreArticlesGrid");
  if (!grid) return;

  const others = Object.values(DS_ARTICLES)
    .filter(a => a.id !== currentId && !a.isVideo)
    .slice(0, 3);

  grid.innerHTML = others.map((a, i) => `
    <div class="col-12 col-md-6 col-lg-4">
      <div class="ds-blog-card" data-article-link="${a.id}" style="cursor:pointer;">
        <div class="more-card-accent ${ACCENT_COLORS[i % ACCENT_COLORS.length]}"></div>
        <div class="ds-blog-img-wrap">
          <img src="${a.image}" alt="${a.title}" class="ds-blog-img" />
          <span class="ds-blog-category">${a.category}</span>
        </div>
        <div class="ds-blog-body">
          <h5 class="ds-blog-title">${a.title}</h5>
          <div class="ds-blog-meta">
            <span>${a.date}</span>
            <span>${a.read}</span>
          </div>
          <a href="#" class="ds-read-btn" data-article-link="${a.id}">Read Story</a>
        </div>
      </div>
    </div>
  `).join("");

  grid.querySelectorAll("[data-article-link]").forEach(el => {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      goToArticle(this.dataset.articleLink);
    });
  });
}

/* ----------------------------------------------------------
   8. SUBSCRIBE PROMPT HANDLER
   Wires up all email inputs + subscribe buttons sitewide.
   Shows a window prompt, clears the input on confirm.
   ---------------------------------------------------------- */
function handleSubscribe(inputEl) {
  const email = inputEl ? inputEl.value.trim() : "";
  if (!email) {
    alert("Please enter your email address.");
    return;
  }
  const confirmed = window.confirm(
    `Subscribe to DailyScope with:\n${email}\n\nYou'll receive Africa's top stories daily. No spam, unsubscribe anytime.`
  );
  if (confirmed) {
    if (inputEl) inputEl.value = "";
    alert("You're subscribed! Welcome to DailyScope.");
  }
}

function initSubscribeForms() {
  // Pairs: [button id, input id]
  const pairs = [
    ["sidebarSubscribeBtn",  "sidebarEmailInput"],
    ["footerSubscribeBtn",   "footerEmailInput"],
    ["mainNlBtn",            "mainNlInput"],
  ];

  pairs.forEach(([btnId, inputId]) => {
    const btn   = document.getElementById(btnId);
    const input = document.getElementById(inputId);
    if (!btn) return;
    btn.addEventListener("click", () => handleSubscribe(input));
    if (input) {
      input.addEventListener("keydown", e => {
        if (e.key === "Enter") handleSubscribe(input);
      });
    }
  });

  // Catch-all: any button with data-subscribe-input="<inputId>"
  document.querySelectorAll("[data-subscribe-input]").forEach(btn => {
    btn.addEventListener("click", function () {
      const input = document.getElementById(this.dataset.subscribeInput);
      handleSubscribe(input);
    });
  });
}

/* ----------------------------------------------------------
   9. NAVBAR "SUBSCRIBE" → SMOOTH SCROLL TO NEWSLETTER
   On index.html the CTA scrolls down to #main_page_newsletter.
   On article.html it goes back to index.html#main_page_newsletter.
   ---------------------------------------------------------- */
function initNavSubscribe() {
  const cta = document.querySelector(".ds-nav-cta");
  if (!cta) return;

  const isIndexPage = !!document.getElementById("main_page_newsletter");

  if (isIndexPage) {
    cta.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.getElementById("main_page_newsletter");
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  }
  // On article.html the href already points to index.html#main_page_newsletter — no override needed.
}

/* ----------------------------------------------------------
   10. READING PROGRESS BAR (article.html only)
   ---------------------------------------------------------- */
function initReadingProgress() {
  // Inject the bar element
  const bar = document.createElement("div");
  bar.id = "readingProgressBar";
  document.body.prepend(bar);

  window.addEventListener("scroll", () => {
    const scrollTop    = window.scrollY;
    const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
    const progress     = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width    = progress + "%";
  });
}

/* ----------------------------------------------------------
   11. INIT — runs on DOMContentLoaded
   Detects which page we're on and runs the right logic.
   ---------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
  const isArticlePage = document.querySelector(".article-hero") !== null;
  const isIndexPage   = document.getElementById("latest_news") !== null;

  if (isIndexPage) {
    initArticleLinks();
  }

  if (isArticlePage) {
    populateArticlePage();
    initReadingProgress();
  }

  initSubscribeForms();
  initNavSubscribe();
});
