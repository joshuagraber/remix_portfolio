import { type MetaFunction, useLoaderData, Link } from 'react-router'
import { LinkPreview } from '#app/components/link-preview'
import { Spacer } from '#app/components/spacer'
import { prisma } from '#app/utils/db.server'
import { Time } from './fragments+/__time'

export const meta: MetaFunction = () => [{ title: 'Joshua D. Graber' }]
export async function loader() {
	const recentFragments = await prisma.post.findMany({
		where: {
			publishAt: {
				not: null,
				lte: new Date(), // less than or equal to current time
			},
		},
		orderBy: {
			publishAt: 'desc',
		},
		take: 3,
	})

	return { fragments: recentFragments }
}

export default function Index() {
	const data = useLoaderData<typeof loader>()

	return (
		<main className="container">
			<Spacer size="4xs" />
			<h1>Joshua D. Graber</h1>
			<Spacer size="4xs" />
			<p>
				Hi 👋 I'm Joshua. I currently work as a writer, editor, and computer
				scientist.
				<Spacer size="4xs" />
				I have previously worked as an adjunct professor, graduate student
				worker, activist, tutor, bartender, landscaper, farmhand, dishwasher,
				and entrepreneur.
				<Spacer size="4xs" />
				Learn more about my work in the sections below.
			</p>
			<Spacer size="2xs" />
			{/* Writing */}
			<h2 id="writing">Writing</h2>
			<Spacer size="4xs" />
			<p>
				I am trained as a fiction writer (M.F.A University of Pittsburgh, 2018)
				and have published my fiction, poetry, essays, and genre-fluid work in
				literary journals and other publications, including <em>Guernica</em>,{' '}
				<em>diagram</em>, <em>Glimmer Train</em>, <em>The New Guard Review</em>
				&apos;s BANG!, the Pittsburgh <em>Post Gazette</em>, and{' '}
				<em>Art Review</em>.
			</p>
			<Spacer size="4xs" />
			<h3>Recent fragments</h3>
			<ol className="my-4 list-decimal space-y-2 pl-6">
				{data.fragments.map(({ title, description, slug, publishAt }) => {
					return (
						<li key={title + slug} className="display-list-item">
							<Link to={`/fragments/${slug}`} className="block">
								<h4>{title}</h4>
								{description && (
									<p className="no-underline hover:underline">{description}</p>
								)}
							</Link>
							{publishAt && (
								<Time
									className="no-underline hover:underline"
									time={publishAt.toDateString()}
								/>
							)}
						</li>
					)
				})}
			</ol>
			<Link to="fragments">View all fragments</Link>
			<Spacer size="4xs" />
			<h3>Some recent publications</h3>
			<ul>
				{/* TODO: add to DB, create admin route to update these without needing to trigger a new build. */}
				<li>
					<LinkPreview
						className="max-w-3xl"
						url="https://www.post-gazette.com/ae/books/2025/02/02/review-dose-effect-optimize-dopamine-oxytocin-serotonin-endorphins-tj-power/stories/202502020045"
					/>
					<LinkPreview
						className="max-w-3xl"
						url="https://www.post-gazette.com/ae/books/2024/04/27/review-mara-van-der-lugt-begetting-what-does-it-mean-to-create-a-child/stories/202404280037"
					/>
					<LinkPreview
						className="max-w-3xl"
						url="https://artreview.com/genre-and-the-newer-newness-danielle-dutton-prairie-dresses-art-other-review/"
					/>
					<LinkPreview
						className="max-w-3xl"
						url="https://mrbullbull.com/newbull/fiction/metaphors-toward-__________________"
					/>
				</li>
			</ul>
			<Spacer size="2xs" />
			{/* Software */}
			<h2 id="software">Software</h2>
			<Spacer size="4xs" />
			<p>
				I currently work as a software engineer for{' '}
				<a href="https://www.aura.com" rel="noreferrer noopener" target="blank">
					Aura
				</a>
				, a consumer digital security company.
				<Spacer size="4xs" />I also maintain the open-source client applications
				for the{' '}
				<a href="https://www.pdap.io" rel="noreferrer noopener" target="blank">
					Police Data Accessibility Project
				</a>
				, a non-profit focused on making police data available to researchers,
				journalists, and anyone else who might be impacted by policing.
				<Spacer size="4xs" />I am occasionally available for engineering
				projects on a freelance basis. Please{' '}
				<a
					href="mailto:joshua.d.graber@gmail.com"
					rel="noreferrer noopener"
					target="blank"
				>
					get in touch
				</a>{' '}
				if you are interested in collaborating.
			</p>
			<Spacer size="2xs" />
			{/* Editing */}
			<h2 id="editing">Editing</h2>
			<Spacer size="4xs" />
			<p>
				I have worked for nearly fifteen years as a literary editor of prose and
				poetry. My editorial career began as the founding executive editor of
				<em>The Quaker</em>, a journal I started as an undergraduate with the
				help of my mentor John Estes.
				<Spacer size="4xs" />
				In graduate school, I worked as the fiction editor of{' '}
				<em>Hot Metal Bridge</em>. I am proud to have worked with some
				incredible contemporary writers. I also worked briefly as the managing
				editor of <em>Aster(ix)</em>, where I learned a great deal about
				building literary community through publishing.
				<Spacer size="4xs" />
				After completing my graduate work, I became the founding fiction editor
				of{' '}
				<a
					href="https://www.wordwest.co"
					rel="noreferrer noopener"
					target="blank"
				>
					Word West Press
				</a>
				, where I worked on some wonderful books across styles and genres.
				<Spacer size="4xs" />I am available for editorial work on a freelance
				basis. If you are interested, please{' '}
				<a
					href="mailto:joshua.d.graber@gmail.com"
					rel="noreferrer noopener"
					target="blank"
				>
					say hello
				</a>{' '}
				or check out{' '}
				<a
					href="https://reedsy.com/joshua-graber"
					rel="noreferrer noopener"
					target="blank"
				>
					my profile on Reedsy
				</a>
				.
			</p>
			<Spacer size="2xs" />
			{/* Misc. */}
			<h2>Teaching and speaking</h2>
			<Spacer size="4xs" />
			<p>
				Every now and then, I put my professor hat back on and teach a writing
				workshop or programming course. If you’re in need of an engaging and
				improvisational educator, please{' '}
				<a
					href="mailto:joshua.d.graber@gmail.com"
					rel="noreferrer noopener"
					target="blank"
				>
					say hello
				</a>{' '}
			</p>
			<Spacer size="lg" />
		</main>
	)
}
