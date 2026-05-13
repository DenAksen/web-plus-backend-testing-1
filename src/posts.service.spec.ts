import { Post, PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;
  const post: Omit<Post, 'id' | 'date'> = {
    text: 'Mocked post',
  };

  beforeEach(async () => {
    postsService = new PostsService();

    postsService.create({ text: 'Some pre-existing post' });
  });

  it('should add a new post', () => {
    const newPostText = 'Mocked post';
    
    const createdPost = postsService.create({ text: newPostText });
    
    // Assert
    expect(createdPost).toBeDefined();
    expect(createdPost.id).toBeDefined();
    expect(createdPost.id).toBe('2');
    expect(createdPost.text).toBe(newPostText);
    expect(createdPost.date).toBeDefined();
    expect(typeof createdPost.date).toBe('string');
  });

  it('should find a post', () => {
    // Arrange
    const createdPost = postsService.create({ text: 'Post to find' });
    const expectedPostId = createdPost.id;
    
    // Act
    const foundPost = postsService.find(expectedPostId);
    
    // Assert
    expect(foundPost).toBeDefined();
    expect(foundPost?.id).toBe(expectedPostId);
    expect(foundPost?.text).toBe('Post to find');
    expect(foundPost?.date).toBeDefined();
  });
});