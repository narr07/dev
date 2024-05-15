---
date: 2022-08-23T00:00:00.000Z
description: 2 Writing Markdown articles in Alpine is straightforward.
layout: artikel
img: 'https://cdn.pixabay.com/photo/2024/04/25/06/50/banana-8719086_1280.jpg'
tags: [tekonologi, guru, tutorial]
author: 'Perm'
---

# Write Articles

`code inline`.

`const codeInline: string = 'highlighted code inline'`

Write Markdown articles in Alpine is straightforward.

Implement lazy loading for images, ensuring that they load only when they come into the user's viewport. This optimizes page loading times, especially for websites with extensive image content.

::gambar
---
title: Contoh gambar
url: 'https://cdn.pixabay.com/photo/2024/04/25/06/50/banana-8719086_1280.jpg'
---
::


```vue [pages/[...slug\\].vue]
<template>
  <main>
    <ContentDoc />
  </main>
</template>
```

## Create an articles list

::doc
---
url: '/doc/pdftes.pdf'
---
::

Create a new file in the `content/` directory:

```bash
touch content/2.articles.md
```

The numbered prefix determines the order of the menu items.

In this file, use the `articles-list` component to display the list of articles:

  ```js [file.js]{4-6,7} meta-info=val
  export default () => {
    console.log('Code block')
  }
  ```

The `path` prop corresponds to the directory where the articles are stored.

## Display an article in the list

Create a new file in the `/content/articles` directory:

```bash
mkdir content/articles
touch content/articles/1.my-new-article.md
```

For your article to be correctly displayed in the [articles list](/articles), define a `cover` and `date` property in the frontmatter:

```yaml [content/articles/1.my-new-article.md]
---
cover: path/to/cover
date: 2022-08-23
---
```

The `cover` property can be a local path relative to the `/public` directory or an external URL.

Your article will now be displayed in the list with its filename as a default title.

## Edit your article

Under the frontmatter block, enter a Markdown `h1` tag and a line of text:

```md [content/articles/1.my-new-article.md]
---
cover: path/to/cover
date: 2022-08-23
---
# An awesome article
This article is little by size but big by heart.
```

Your article will now be displayed in the list with the title and description you wrote in Markdown.

## Override title and description

If you want to change the title and description displayed on the list and in the meta tags of the article, add the `title` and `description` property to your frontmatter:

```md [content/articles/1.my-new-article.md]
---
cover: path/to/cover
date: 2022-08-23
title: Another title
description: Another description
---
```

You are now ready to edit your article and create new ones!

## Optional Arguments

In the frontmatter block, you can pass additional options for displaying your article, such as displaying badges on the image:

```md
---
cover: path/to/cover
date: 2022-08-23
badges: [{
  color: 'white',
  bg: 'rgba(0, 0, 0, 0.3)',
  content: 'Technology'
}]
---
```

## Read more

Alpine is a Nuxt theme using the Content module in `documentDriven` mode.

👉 Learn more in the [Nuxt Content documentation](https://content.nuxtjs.org/).
