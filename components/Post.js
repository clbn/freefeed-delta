import Link from 'next/link';
import AttachmentImage from './AttachmentImage';
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

      <section className="attachments">
        {post.attachmentIds.map(attId => (
          <AttachmentImage key={attId} {...attachments[attId]}/>
        ))}
      </section>

      <section>
        <Link href={postUrl}>
          <a><Time stamp={post.createdAt}/></a>
        </Link>
      </section>

      <ul>
        {post.commentIds.slice(0, 1).map(commentId => (
          <li key={commentId}>
            <Comment postId={postId} postAuthorId={post.authorId} commentId={commentId} comment={comments[commentId]} users={users}/>
          </li>
        ))}

        {post.omittedComments > 0 && (
          <li>
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
        .attachments {
          margin-right: -0.5rem;
        }
      `}</style>
    </article>
  );
};

export default Post;
