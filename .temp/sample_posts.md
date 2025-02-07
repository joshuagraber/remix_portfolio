<!-- Code block -->

## Code block

```js
	return (
		<div className="jdg_typography mx-auto w-full max-w-screen-md p-8">
			<h1 className="mb-4">{frontmatter.title}</h1>
			<p>{frontmatter.description}</p>
			<p className="text-sm text-neutral-500">
				{/* Non-null assertion okay here. If the post is returned here, that means it's published */}
				<Time time={post.publishAt!} />
			</p>
			<div>
				<Component components={mdxComponents} />
			</div>
		</div>
	)
```

<!-- Youtube preview -->

## Youtube preview

```md
::youtube{#KLiDpOoLXpY}
```

<!-- Link preview -->

## Link preview

```md
::preview{url="https://www.vogue.com/article/the-flavors-of-my-grief-a-food-writers-journey-through-miscarriage"}

::preview{url="https://www.espn.com/racing/nascar/story/_/id/43629605/nascar-preseason-race-comes-home-bowman-gray-hosts-clash"}

::preview{url="https://www.vox.com/even-better/396840/emergency-fund-savings-expenses-financal-goals-budget"}
```

<!-- Lists -->

## Lists

---

- Aliquam laborum, dignissimos expedita,
- explicabo natus dolorum consequuntur nisi, ad corporis repellat repudiandae?
  - Sunt illo inventore harum accusantium.
  - Illum neque minima ducimus id
- necessitatibus voluptate labore libero iusto laborum ipsa harum quod maxime
  autem cum quaerat ea,
- quidem modi laudantium et dolor qui vitae sint? Ullam possimus libero cum?
  - Amet nemo earum,
    - quos voluptates placeat ipsa in?
  - - At ut hic magnam esse commodi itaque perferendis ipsum temporibus
      voluptates explicabo quasi quibusdam,
- obcaecati quam pariatur.

1. Ad facere sequi minima maiores nihil. Necessitatibus eveniet adipisci
   asperiores facere sunt harum fugiat labore placeat repudiandae a?
2. Voluptate omnis eos soluta fuga debitis sint maiores ullam voluptatem ipsam
   at, cum nesciunt dolorem? Minus est harum consequatur fugit veritatis illo,
   sapiente sed.
3. Voluptates quas repudiandae consequatur ducimus. Dolores quidem veritatis
   tempore provident?

<!-- Text with image  -->

## Text with image

---

Aliquam laborum, dignissimos expedita, explicabo natus dolorum consequuntur
nisi, ad corporis repellat repudiandae? Sunt illo inventore harum accusantium.
Illum neque minima ducimus id necessitatibus voluptate labore libero iusto
laborum ipsa harum quod maxime autem cum quaerat ea, quidem modi laudantium et
dolor qui vitae sint? Ullam possimus libero cum?

Amet nemo earum, quos voluptates placeat ipsa in? At ut hic magnam esse commodi
itaque perferendis ipsum temporibus voluptates explicabo quasi quibusdam,
obcaecati quam pariatur. Ad facere sequi minima maiores nihil. Necessitatibus
eveniet adipisci asperiores facere sunt harum fugiat labore placeat repudiandae
a? Voluptate omnis eos soluta fuga debitis sint maiores ullam voluptatem ipsam
at, cum nesciunt dolorem? Minus est harum consequatur fugit veritatis illo,
sapiente sed. Voluptates quas repudiandae consequatur ducimus. Dolores quidem
veritatis tempore provident?

![Kttn closeup](https://yavuzceliker.github.io/sample-images/image-107.jpg 'Kitty')

Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa quaerat assumenda
pariatur similique alias rerum numquam quidem totam eius odit blanditiis
delectus perferendis mollitia consectetur, reprehenderit incidunt vel accusamus
ad voluptatum error doloribus? Amet adipisci eius itaque deleniti tempore sunt.

Est pariatur molestiae, maxime voluptatum laboriosam quis! Veritatis harum quam
voluptas neque cum ipsum officiis, voluptatum minima ratione porro tempora quia,
sed perspiciatis fuga saepe sunt maxime similique ullam pariatur consequatur
ipsam nostrum recusandae.
