import Image from "next/image";
import { glass } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

const Avatar = ({seed, className = ''}: { seed: string; className?: string} ) => {
  const avatar = createAvatar(glass, { seed })
  const svg = avatar.toString()
  const dataUrl = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
  return (
    <Image
        src={dataUrl}
        alt='User Avatar'
        className={`${className} rounded-full animate-[spin_10s_linear_infinite]`}
        width={100}
        height={100}
    />
  )
}
export default Avatar