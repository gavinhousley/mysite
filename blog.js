fetch("blog/manifest.json")
  .then((response) => response.json())
  .then((posts) => {
    posts.forEach((postPath) => {
      fetch(postPath)
        .then((r) => r.text())
        .then((markdown) => {
          const html = marked.parse(markdown);
          const div = document.createElement("div");
          div.innerHTML = html;
          document.getElementById("blog-container").appendChild(div);
        });
    });
  });
