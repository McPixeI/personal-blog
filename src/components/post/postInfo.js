import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import * as React from "react"


const PostInfo = ({author, date}) => {

  return (
    <div className='author-card'>
      <StaticImage
        className="author-card__img"
        placeholder="blurred"
        formats={["AUTO", "WEBP", "AVIF"]}
        src="../../images/profile-img.jpg"
        width={50}
        height={50}
        quality={95}
        imgStyle={{ borderRadius: '100%' }}
        alt="Profile picture"
      />
      <div className='d-flex flex-direction-column'>
        <Link className='author-card__name' to='/about'>{author}</Link>
        <time className='author-card__date'>{date}</time>
      </div>
    </div>     
  )
}

export default PostInfo
