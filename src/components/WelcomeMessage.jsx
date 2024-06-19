// Works when there are no post

const WelcomeMessage = ({ onGetPostsClick }) => {
  return (
    <div className="welcomemessage">
      <h1 className="welcomemessage-heading">There are no Posts</h1>
      <button
        type="button"
        className="btn btn-primary"
        onClick={onGetPostsClick}
      >
        Get Post from Server
      </button>
    </div>
  );
};

export default WelcomeMessage;
