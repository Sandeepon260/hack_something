import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div>
        <Image height={400} width={400} src={"/uploads/alert.png"} alt='hello'/>

    </div>
  )
}

export default page