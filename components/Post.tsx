import { useRouter } from 'next/router';
import Link from 'next/link';

import { useSelector } from '../store';
import Userpic from './Userpic';
import PostAuthorship from './PostAuthorship';
import PieceOfText from './PieceOfText';
import PostAttachments from './PostAttachments';
import PostActions from './PostActions';
import PostLikes from './PostLikes';
import PostComments from './PostComments';
import CommentAddForm from './CommentAddForm';

const Post = ({ id }) => {
  const isPostMissing = useSelector(state => state.posts[id] === undefined);
  const errorCode = useSelector(state => state.posts[id]?.errorCode);
  const errorMessage = useSelector(state => state.posts[id]?.errorMessage);
  if (isPostMissing) {
    return null;
  }
  if (errorCode || errorMessage) {
    return <article><h1>{errorCode}</h1><p>{errorMessage}</p></article>;
  }
  return <PostNotEmpty id={id}/>;
};

const PostNotEmpty = ({ id }) => {
  const { route } = useRouter();
  const isIndividual = (route === '/[user]/[post]');

  const authorId = useSelector(state => state.posts[id].authorId);
  const body = useSelector(state => state.posts[id].body);

  const authorUsername = useSelector(state => state.users[authorId].username);

  const postUrl = `/${authorUsername}/${id}`;

  const userpicSize = (isIndividual ? 75 : 50);

  return (
    <article>
      <section className="userpics">
        <Link href={`/${authorUsername}`}>
          <a><Userpic id={authorId} size={userpicSize}/></a>
        </Link>
      </section>

      <PostAuthorship postId={id}/>

      <section className="body">
        <PieceOfText>{body}</PieceOfText>
      </section>

      <PostAttachments postId={id}/>

      <PostActions postId={id} postUrl={postUrl}/>

      <PostLikes postId={id} postUrl={postUrl}/>

      <PostComments postId={id} postUrl={postUrl}/>

      <CommentAddForm postId={id}/>

      <style jsx>{`
        article {
          display: grid;
          grid-template-areas: "userpics authorship"
                               "userpics body"
                               "userpics attachments"
                               "userpics actions"
                               "userpics likes"
                               "userpics comments"
                               "userpics comment-add-form";
          grid-template-columns: auto 1fr; /* left column size is by content, right one takes the rest */
          column-gap: ${isIndividual ? 0.75 : 0.625}rem;

          border-top: 1px solid #eee;
          padding-top: 1rem;
          padding-bottom: 0.5rem;
        }
        section {
          display: block;
          overflow-wrap: break-word;
          margin-bottom: 0.5rem;
        }
        .userpics {
          grid-area: userpics;
          margin-top: 0.2rem;
        }
        .body {
          grid-area: body;
          font-size: ${isIndividual ? 1.25 : 1.125}rem;
        }
        
        @media screen and (max-width: 767px) {
          article {
            display: block; /* instead of grid */
          }
          .userpics {
            float: left;
            margin-right: ${isIndividual ? 0.75 : 0.625}rem;
            margin-bottom: 0.3rem; /* instead of 0.5rem, for better text wrapping */
          }
        }

      `}</style>
    </article>
  );
};

export default Post;
