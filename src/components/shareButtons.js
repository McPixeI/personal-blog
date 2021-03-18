import React from 'react'

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon
} from 'react-share'

const ShareButtons = ({title, url, twitterHandle, tags}) => {

    return(
        <div>
          <FacebookShareButton url={url}  >
                <FacebookIcon  size={40} round={false} iconFillColor='rgb(59, 89, 152)' bgStyle={{fill:'white'}} />
         </FacebookShareButton>
          <TwitterShareButton url={url} title={title} via={twitterHandle} hashtags={tags}>
                <TwitterIcon  size={40} round={false} iconFillColor='rgb(0, 172, 237)' bgStyle={{fill:'white'}} />
          </TwitterShareButton>
        </div>
      )

}
export default ShareButtons