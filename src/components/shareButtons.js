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
                <FacebookIcon  size={40} round={false} iconFillColor='rgba(117, 117, 117, 1)' bgStyle={{fill:'transparent'}} />
         </FacebookShareButton>
          <TwitterShareButton url={url} title={title} via={twitterHandle} hashtags={tags}>
                <TwitterIcon  size={40} round={false} iconFillColor='rgba(117, 117, 117, 1)' bgStyle={{fill:'transparent'}} />
          </TwitterShareButton>
        </div>
      )

}
export default ShareButtons