interface NameField {
	name_first: string;
	name_middle?: string;
	name_last: string;
}

// BLOG
export interface Comment {
	author: NameField;
	author_email: string;
	author_website: string;
	_id: string; // Mongo ObjectID
	content: string;
}

export type Comments = Comment[];

export interface Post {
	_id: string;
	author: NameField;
	comments: Comments;
	content: string;
	slug: string;
	tagline: string;
	time_posted: string;
	title: string;
}

export type Posts = Post[];
