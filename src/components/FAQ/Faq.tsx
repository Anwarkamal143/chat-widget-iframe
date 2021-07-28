import  { ReactElement } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { LikeIcon } from '../../assets';
import { Header } from '../Header'

type IChatProps = {
  className?: string;
  handleClose?: () => void
};
const Likes = [1,2,3,4,5]
function  Faq  (props: IChatProps): ReactElement  {
    const { className, handleClose } = props;
    return (
      <div className={className}>
        <div className="content-box">
          <Header title=" Search Knowledge" onClose={handleClose} />

          <div className="scrolled-area">
            <div className="content-area">
              <div className="field">
                <input type="text" placeholder="Type your question here..." />
              </div>
              <div className="question-box">
                <strong className="question">
                  <Link to="">
                    How do I install LiveHelpNow widget code in Google Tag
                    Manager
                  </Link>
                </strong>
                <div className="answer-box">
                  <p>
                    Google Tag Manager (GTM) is a simple solution for managing
                    JavaScript snippets that send data to third parties (like
                    LiveHelpNow) from your website or app. You can easily add or
                    remove snippets...
                  </p>
                  <div className="viewers-info">
                    <span className="views">612 views</span>
                    <ul className="list-thumbs">
                      {Likes.map(like => {

                      return <li key={like}>
                        <LikeIcon />
                      </li>
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
export default styled(Faq)`
  .question-box {
    border: 1px solid #e4e4e4;
    border-radius: 8px;

    .question {
      background: #e4e4e4;
      padding: 10px;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      display: block;
    }

    .answer-box {
      padding: 10px;
      font-size: 14px;
      line-height: 1.5;
      color: rgb(102, 102, 102);
    }

    p {
      margin: 0 0 10px;
    }
  }

  .viewers-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .list-thumbs {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    line-height: 1;

    li {
      width: 10px;
    }

    svg {
      width: 100%;
      height: auto;
      fill: #999;
    }
  }
`;