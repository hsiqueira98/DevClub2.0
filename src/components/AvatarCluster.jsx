/*
 * Avatar-cluster social proof — signature UI device from the current
 * site (docs/BRAND.md): overlapping circular student photos with a
 * green ring, next to a student count.
 */
const AVATARS = [
  'https://randomuser.me/api/portraits/thumb/women/21.jpg',
  'https://randomuser.me/api/portraits/thumb/men/54.jpg',
  'https://randomuser.me/api/portraits/thumb/women/65.jpg',
  'https://randomuser.me/api/portraits/thumb/men/17.jpg',
  'https://randomuser.me/api/portraits/thumb/women/49.jpg',
]

export default function AvatarCluster({ label, className = '' }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <ul className="flex -space-x-3">
        {AVATARS.map((src) => (
          <li key={src}>
            <img
              src={src}
              alt=""
              loading="lazy"
              className="size-10 rounded-full ring-2 ring-green-500"
            />
          </li>
        ))}
      </ul>
      <p className="text-sm font-medium text-gray-300">{label}</p>
    </div>
  )
}
