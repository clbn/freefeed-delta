import Link from 'next/link';
import AttachmentImage from './AttachmentImage';
import PostLikes from './PostLikes';
import Comment from './Comment';
import Time from './Time';

const Post = ({ postId, post, attachments, comments, users }) => {
  const authorUrl = `/${users[post.authorId].username}`;
  const postUrl = `/${users[post.authorId].username}/${postId}`;

  return (
    <article>
      <section>
        <Link href={authorUrl}>
          <a>{users[post.authorId].displayName}</a>
        </Link>
      </section>

      <section>
        {post.body}
      </section>

      {post.attachmentIds.length > 0 && (
        <section className="attachments">
          {post.attachmentIds.map(attId => (
            <AttachmentImage key={attId} {...attachments[attId]}/>
          ))}
        </section>
      )}

      <section>
        <Link href={postUrl}>
          <a><Time stamp={post.createdAt}/></a>
        </Link>
      </section>

      {post.likerIds.length > 0 && (
        <PostLikes likerIds={post.likerIds} omittedLikes={post.omittedLikes} users={users}/>
      )}

      <ul className="comments">
        {post.commentIds.slice(0, 1).map(commentId => (
          <li key={commentId}>
            <Comment postId={postId} postAuthorId={post.authorId} commentId={commentId} comment={comments[commentId]} users={users}/>
          </li>
        ))}

        {post.omittedComments > 0 && (
          <li className="more-comments">
            <Link href={postUrl}>
              <a>{post.omittedComments} more comments</a>
            </Link>
          </li>
        )}

        {post.commentIds.slice(1).map(commentId => (
          <li key={commentId}>
            <Comment postId={postId} postAuthorId={post.authorId} commentId={commentId} comment={comments[commentId]} users={users}/>
          </li>
        ))}
      </ul>

      <style jsx>{`
        article {
          border-top: 1px solid #eee;
          padding-top: 1rem;
        }
        section {
          display: block;
          overflow-wrap: break-word;
          margin-bottom: 0.5rem;
        }
        .attachments {
          display: flex;
          padding: 0.15rem 0;
          margin-right: -0.5rem;
          margin-bottom: 0;
        }
        .comments {
          list-style: none;
          padding: 0;
          margin-top: 0;
        }
        .more-comments {
          font-style: italic;
          padding-left: 1.4rem;
          margin-bottom: 0.5rem;
        }
      `}</style>
    </article>
  );
};

export default Post;
