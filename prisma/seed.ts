// import { faker } from '@faker-js/faker'
import { promiseHash } from 'remix-utils/promise'
import { prisma } from '#app/utils/db.server.ts'
import { MOCK_CODE_GITHUB } from '#app/utils/providers/constants'
import {
	createPassword,
	// createUser,
	// getUserImages,
	img,
} from '#tests/db-utils.ts'
import { insertGitHubUser } from '#tests/mocks/github.ts'

async function seed() {
	console.log('🌱 Seeding...')
	console.time(`🌱 Database has been seeded`)

	// First create the roles
	console.time('👑 Creating roles...')
	await prisma.role.createMany({
		data: [{ name: 'admin' }, { name: 'user' }],
	})
	console.timeEnd('👑 Creating roles...')

	// No need to seed users at the moment, but if it becomes necessary later on, leaving commented out in case.

	// const totalUsers = 5
	// console.time(`👤 Created ${totalUsers} users...`)
	// const noteImages = await getNoteImages()
	// const userImages = await getUserImages()

	// for (let index = 0; index < totalUsers; index++) {
	// 	const userData = createUser()
	// 	await prisma.user
	// 		.create({
	// 			select: { id: true },
	// 			data: {
	// 				...userData,
	// 				password: { create: createPassword(userData.username) },
	// 				image: { create: userImages[index % userImages.length] },
	// 				roles: { connect: { name: 'user' } },
	// 				notes: {
	// 					create: Array.from({
	// 						length: faker.number.int({ min: 1, max: 3 }),
	// 					}).map(() => ({
	// 						title: faker.lorem.sentence(),
	// 						content: faker.lorem.paragraphs(),
	// 						images: {
	// 							create: Array.from({
	// 								length: faker.number.int({ min: 1, max: 3 }),
	// 							}).map(() => {
	// 								const imgNumber = faker.number.int({ min: 0, max: 9 })
	// 								const img = noteImages[imgNumber]
	// 								if (!img) {
	// 									throw new Error(`Could not find image #${imgNumber}`)
	// 								}
	// 								return img
	// 							}),
	// 						},
	// 					})),
	// 				},
	// 			},
	// 		})
	// 		.catch((e) => {
	// 			console.error('Error creating a user:', e)
	// 			return null
	// 		})
	// }
	// console.timeEnd(`👤 Created ${totalUsers} users...`)

	console.time(`🐨 Created admin user "kody"`)

	const kodyImages = await promiseHash({
		kodyUser: img({ filepath: './tests/fixtures/images/user/kody.png' }),
		// cuteKoala: img({
		// 	altText: 'an adorable koala cartoon illustration',
		// 	filepath: './tests/fixtures/images/kody-notes/cute-koala.png',
		// }),
		// koalaEating: img({
		// 	altText: 'a cartoon illustration of a koala in a tree eating',
		// 	filepath: './tests/fixtures/images/kody-notes/koala-eating.png',
		// }),
		// koalaCuddle: img({
		// 	altText: 'a cartoon illustration of koalas cuddling',
		// 	filepath: './tests/fixtures/images/kody-notes/koala-cuddle.png',
		// }),
		// mountain: img({
		// 	altText: 'a beautiful mountain covered in snow',
		// 	filepath: './tests/fixtures/images/kody-notes/mountain.png',
		// }),
		// koalaCoder: img({
		// 	altText: 'a koala coding at the computer',
		// 	filepath: './tests/fixtures/images/kody-notes/koala-coder.png',
		// }),
		// koalaMentor: img({
		// 	altText:
		// 		'a koala in a friendly and helpful posture. The Koala is standing next to and teaching a woman who is coding on a computer and shows positive signs of learning and understanding what is being explained.',
		// 	filepath: './tests/fixtures/images/kody-notes/koala-mentor.png',
		// }),
		// koalaSoccer: img({
		// 	altText: 'a cute cartoon koala kicking a soccer ball on a soccer field ',
		// 	filepath: './tests/fixtures/images/kody-notes/koala-soccer.png',
		// }),
	})

	const githubUser = await insertGitHubUser(MOCK_CODE_GITHUB)

	await prisma.user.create({
		select: { id: true },
		data: {
			email: 'kody@example.com',
			username: 'kody',
			name: 'Kody',
			image: { create: kodyImages.kodyUser },
			password: { create: createPassword('kodylovesyou') },
			connections: {
				create: { providerName: 'github', providerId: githubUser.profile.id },
			},
			roles: { connect: [{ name: 'admin' }, { name: 'user' }] },
		},
	})
	console.timeEnd(`🐨 Created admin user "kody"`)

	console.timeEnd(`🌱 Database has been seeded`)
}

seed()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})

// we're ok to import from the test directory in this file
/*
eslint
	no-restricted-imports: "off",
*/
